/**
 * Created by alex on 26/11/15.
 */
angular.module( "tooFrenchApp" )
    .directive( 'uiSelectRequired', function() {
        return {
            require: 'ngModel',
            link: function( scope, element, attrs, ngModelController ) {
                var idName = attrs.name;
                console.log('uiSelectRequired');
                ngModelController.$validators[idName] = function( modelValue, viewValue ) {
                    return modelValue !== undefined && modelValue !== null && modelValue && modelValue.length > 0;
                };
            }
        };
    });