console.log('Starting async-basics.js');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('Second set timeout');
}, 0)

console.log('Finishing up');
