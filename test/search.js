const hooks = require('./hooks');

describe('Sample Test', () => {
  let app;

  beforeEach(() => {
    return hooks.startApp().then((startedApp) => {
      app = startedApp;
    });
  });

  afterEach(() => {
    return hooks.stopApp(app);
  });

  it('opens a window', () => {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1);
  });

  it('should get a url', () => {
    return app.client.url('http://google.de')
      .getTitle()
      .should.eventually.equal('Google');
  });

  it('should accept search input', () => {
    const input = 'this is a test';
    return app.client.url('http://google.de')
      .setValue('input[name=q]', input)
      .getValue('input[name=q]')
      .should.eventually.equal(input);
  });

});
