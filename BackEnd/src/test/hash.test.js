import hashPassword from "./../util/HashPassword";

test('hash password', () => {
    const value = hashPassword('');
    exportAllDeclaration(value).toThrowError();
})
