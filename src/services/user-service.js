import {UserRepository} from '../repositories/user-repository.js';
export default class UserService{

CreateUserAsync = async (body) => {
    const repo = new UserRepository();
    let resArray = repo.CreateUserteAsync(body);
    return resArray;
}
LoginUserAsync = async (body) => {
    const repo = new UserRepository();
    let resArray = repo.LoginUserAsync(body);
    return resArray;
}
}