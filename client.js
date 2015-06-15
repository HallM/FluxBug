/*global document, window */

import React from 'react';
import debug from 'debug';
import app from './app';
import ApplicationStore from './stores/ApplicationStore';
import axios from 'axios';

const debugClient = debug('fluxbug');
const dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('rehydrating app');

// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }
  window.context = context;
  const mountNode = document.getElementById('app');

  axios.interceptors.request.use((config) => {
    config.data._csrf = context.getActionContext().getStore(ApplicationStore).getCsrf();
    let data = config.data;
    var str = [];
    for(var p in data) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
    }
    config.data = str.join("&");
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    if (response && response.data && response.data.csrf) {
      context.getActionContext().dispatch('SETCSRF_TOKEN', response.data.csrf);
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  debugClient('React Rendering');
  React.render(context.createElement(), mountNode, function () {
    debugClient('React Rendered');
  });
});
