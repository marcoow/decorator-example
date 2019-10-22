import Route from '@ember/routing/route';

function timed(target, name, descriptor) {
  let { value: original } = descriptor;
  if (typeof original === 'function') {
    descriptor.value = function(...args) {
      let startTime = performance.now();

      let result = original.apply(this, args);

      let endTime = performance.now();
      let duration = endTime - startTime;
      console.log(`⏱ ${name}: ${duration}s.`);

      return result;
    }
  }
  return descriptor;
}

export default Route.extend({
  @timed
  async model() {
    let delay = 1 + (Math.random() * 1000);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('The data');
      }, delay);
    });
  }
});
