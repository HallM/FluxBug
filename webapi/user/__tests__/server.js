jest.dontMock('../../webapi/user/server');

describe('Web API : User : Server side', function() {
    describe('.register()', function() {

        it('should generate salt with 10 rounds', function() {
            var bcrypt = require('bcrypt-as-promised');
            var userApi = require('../../webapi/user/server');
            
            expect(bcrypt.genSalt).toBeCalledWith(10);
        });

    });
});
