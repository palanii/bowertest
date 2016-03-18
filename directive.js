angular.module('angularDownloadifyModule', [])
  .provider('angularDownloadifyConfig', function () {

    this.setLocale = function (locale) {
      this.locale = locale;
    };

    this.$get = function () {
      return this;
    };

  })
  .directive('angularDownloadify', function () {

    return {
      scope: {
        fileName: '=fileName',
        fileData: '=fileData',
        saveComplete: '&',
        saveCancel: '&',
        saveError: '&'
      },
      templateUrl: 'template.html',
      controller: function ($scope, angularDownloadifyConfig, $element, $attrs) {
        console.log(angularDownloadifyConfig.locale);
        if (angularDownloadifyConfig.locale === 'es') {
          $scope.greeting = 'Hola Mundo';
        } else {
          $scope.greeting = 'Hello World';
        }
      },
      link: function(scope, element, attrs){
        Downloadify.create('downloadify',{
          filename: function(){
            return scope.fileName;
          },
          data: function(){ 
            return scope.fileData;
          },
          onComplete: function(){ 
            scope.saveComplete();
          },
          onCancel: function(){ 
            scope.saveCancel();
          },
          onError: function(){ 
            scope.saveError();
          },
          transparent: false,
          swf: 'downloadify/media/downloadify.swf',
          downloadImage: 'downloadify/images/download.png',
          // downloadImage: 'https://davidwalsh.name/demo/downloadify_0.1/images/download.png',
          width: 100,
          height: 30,
          transparent: true,
          append: true
        });
      }
    };

  });