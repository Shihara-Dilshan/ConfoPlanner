import { exportAllDeclaration } from "babel-types";
import jwtDecode from "./../util/Jwt";

test('jwtDecode name', () => {
    const value = jwtDecode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    exportAllDeclaration(value).toBe("John Doe");
})

test('jwtDecode wrong', () => {
    const value = jwtDecode('VCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    exportAllDeclaration(value).toThrowError();
})

test('jwtDecode empty', () => {
    const value = jwtDecode();
    exportAllDeclaration(value).toThrowError();
})