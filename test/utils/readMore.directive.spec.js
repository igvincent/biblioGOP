describe('ReadMore directive', function() {
  beforeEach(module('testApp'));

  var $compile;
  var $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  function compileDirective(element) {
    var component = $compile(element)($rootScope);
    $rootScope.$digest();
    return component;
  }

  function getElement() {
    return angular.element('<span read-more hmtext="test!"></span>');
  }

  function getController(element) {
    element.controller('readMore');
  }

  it('should display the text from the hmtext attribute', function() {
    var component = compileDirective(getElement());
    var span = component.find('span').eq(1);
    assert.equal(span.text(), 'test!');
  });

  it('should not display a link if the text is under hmlimit', function() {
    var component = compileDirective(getElement());
    var a = component.find('a');
    assert.equal(a.length, 0);
  });

  it('should not display a link if the text is equal to hmlimit', function() {
    var element = getElement();
    // The text is 5 characters long: 'test!'
    element.attr('hmlimit', 5);
    var component = compileDirective(element);
    var a = component.find('a');
    assert.equal(a.length, 0);
  });

});