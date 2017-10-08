import { KwolyaPage } from './app.po';

describe('kwolya App', function() {
  let page: KwolyaPage;

  beforeEach(() => {
    page = new KwolyaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
