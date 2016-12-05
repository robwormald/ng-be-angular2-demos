import { NgbeDemosPage } from './app.po';

describe('ngbe-demos App', function() {
  let page: NgbeDemosPage;

  beforeEach(() => {
    page = new NgbeDemosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
