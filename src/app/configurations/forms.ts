import {MyHeaders} from "../interfaces/my-headers";

export const formUserAdmin: MyHeaders[] = [
  {key: 'firstName', label: 'Nome *', required: true},
  {key: 'lastName', label: 'Cognome *', required: true},
  {key: 'username', label: 'Username *', required: true},
  {key: 'password', label: 'Password *', required: true, type: "password"},
  {key: 'drivingLicense', label: 'Patente', required: true},
  {key: 'photo', label: 'Foto profilo', type: 'file', required: true}
]
export const formUser: MyHeaders[] = [
  {key: 'firstName', label: 'Nome *', required: true},
  {key: 'lastName', label: 'Cognome *', required: true},
  {key: 'username', label: 'Username *', required: true},
  {key: 'drivingLicense', label: 'Patente', required: true},
  {key: 'photo', label: 'Foto profilo', type: 'file', required: true}
]
