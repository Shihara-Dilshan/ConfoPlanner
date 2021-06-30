import jwt_decode from 'jwt-decode';

export default function jwtDecode(token){
     const token = jwt_decode(token);
     return token.name;
}