var Template = function () {

  /**
   * @package Template
   *
   * the template class is used to store all the information to
   * compile a template. it can be returned as a template string
   * or a json object
   *
   * @author  Andrew Fountain
   * @email   andrew@envision.digital
   * @date    2015-08-01
   */
  var templates = {},
      cache = 1000 * 1;

  /**
   * Template
   *
   * this class is used to hold all the variables used to compile a
   * Template.
   *
   * @param   {Function}  templateFn  function to compile a template
   *
   * @constructor
   */
  function Template(templateFn) {

    this.template = templateFn;
    this.vars = {};
  }

  extend(Template.prototype, {

    /**
     * Template.send
     *
     * this function will compile the template variables with the
     * template function to give a finished template
     *
     * @returns {String}
     */
    send: function (vars) {
      return this.template(vars);
    }
  });

  // add static methods to the template object
  extend(Template, {
    /**
     * @static  Template.get
     *
     * this function will get a template from the cache or call the
     * factory to build a new template function
     *
     * @param   {String}    name    dot separated string representing file path
     * @param   {Request}   req     node js server request object
     * @param   {Response}  res     node js server response object
     *
     * @returns {Template}          new Template instance ready to be used
     */
    get: fluent(function (name) {

      var templateObj = templates[name];

      // create or check cache timeout to rebuild the cache
      if (templateObj == null || templateObj.fn && templateObj.built + cache < Date.now()) {
        console.log(name + ' template rebuilt');
        templateObj = templates[name] = {
          fn: TemplateFactory(name),
          built: Date.now()
        };
      }

      return new Template(templateObj.fn);
    })
  });

  return Template;
}();

//# sourceMappingURL=template-compiled.js.map