import Route from '@ember/routing/route';

function timed(target, name, descriptor) {
  let { value: original } = descriptor;
  if (typeof original === 'function') {
    descriptor.value = async function(...args) {
      let startTime = performance.now();

      let result = await original.apply(this, args);

      let endTime = performance.now();
      let duration = endTime - startTime;
      console.log(`⏱ ${name}: ${duration}ms.`);

      return result;
    }
  }
  return descriptor;
}

export default Route.extend({
  @timed
  async model() {
    let delay = Math.random() * 1500;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('The data');
      }, delay);
    });
  }
});
