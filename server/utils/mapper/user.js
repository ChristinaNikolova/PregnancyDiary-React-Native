function userViewModel(user) {
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture
            ? {
                url: user.picture.url,
            }
            : null,
    };
}

module.exports = {
    userViewModel,
};