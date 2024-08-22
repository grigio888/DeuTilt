import User from '$db/models/user.js';

export async function load({}) {
    const users = await User.findAll();
    console.log(users);
    return { }
}