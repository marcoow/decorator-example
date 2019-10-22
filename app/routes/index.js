import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let delay = 1 + (Math.random() * 1000);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('The data');
      }, delay);
    });
  }
});
