const getUser = (id, callback) => {
  const user = {
    id: id,
    name: 'Kian',
  };
  
  setTimeout(() => {
    callback(user);
  }, 3000)
};

getUser(31, userObject => {
  console.log(userObject);
});
