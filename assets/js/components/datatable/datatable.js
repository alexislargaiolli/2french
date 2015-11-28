/**
 * Created by alex on 28/11/15.
 */
var tooFrench = angular.module('tooFrenchApp');
tooFrench.factory('DataTable', function ($http, $q) {

    /**
     * Datatable Constructor
     * @param model the name of the model to use
     * @param columns array that describe table columns [{'header' : 'name of the column', 'field' : 'name of the model field', 'filter' : 'type of filter : contains, startWith or null not to filter'}, ...]
     * @constructor
     */
    function DataTable(model, columns) {
        /**
         * Name of the model to user in urls
         */
        this.model = model;
        /**
         * Array that describe table columns [{'header' : 'name of the column', 'field' : 'name of the model field', 'filter' : 'type of filter : contains, startWith or null not to filter'}, ...]
         */
        this.columns = columns;

        this.filters = [];

        for (var i = 0; i < this.columns.length; i++) {
            var f = this.columns[i].filter;
            if (f) {
                this.filters[this.columns[i].field] = f;
            }
        }

        /**
         * Number of item per page
         * @type {number}
         */
        this.pageSize = 10;

        /**
         * Current page
         * @type {number}
         */
        this.currentPage = 1;

        /**
         * Number of page
         * @type {number}
         */
        this.pageCount;

        /**
         * Array of items
         * @type {Array}
         */
        this.items = [];

        /**
         * Total count of item
         * @type {number}
         */
        this.itemCount;

        /**
         * Current field used for sorting
         */
        this.sortField;
        /**
         * Current type of order used (ASC, DESC)
         */
        this.sortOrder;
        /**
         * Where condition of the request
         */
        this.where;
    };

    DataTable.prototype = (function () {
        var ASC = 'ASC';
        var DESC = 'DESC';
        /**
         * Flag that indicates if count() request has to be executed before index()
         */
        var needUpdateCount = 0;

        function updatePagination() {
            this.pageCount = this.itemCount / this.pageSize;
            console.log('page count ' + this.pageCount);
        }

        function applyFilter() {
            var url = "where={";
            for (var key in this.where) {
                var attrName = key;
                var attrValue = this.where[key];
                var filterType = this.filters[key];
                url += "\"" + attrName + "\":{\"" + filterType + "\":\"" + attrValue + "\"}"
            }
            url += "}";
            return url;
        }

        /**
         * Load data from server, count() has to been called before
         * @returns {deferred.promise|{then}|{then, catch, finally}}
         */
        function index() {
            console.log('index()');
            var deferred = $q.defer();
            //Apply pagination
            var skip = (this.currentPage - 1) * this.pageSize;

            //Build url
            var url = "/" + this.model + "?skip=" + skip + "&limit=" + this.pageSize;

            //Apply sort
            if (this.sortField) {
                url += "&sort=" + this.sortField + " " + this.sortOrder;
            }

            //Apply filter
            if (this.where) {
                url += "&" + applyFilter.call(this);
            }
            var self = this;
            needUpdateCount = 0;
            $http({
                method: 'GET', url: url
            }).
            success(function (data, status, headers, config) {
                self.items = data;
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });
            return deferred.promise;
        }

        /**
         * Load data count from server
         * @returns {deferred.promise|{then}|{then, catch, finally}}
         */
        function count() {
            console.log('count()');
            var deferred = $q.defer();
            var url = "/" + this.model + "/count";

            //Apply filter
            if (this.where) {
                url += "?" + applyFilter.call(this);
            }
            var self = this;
            $http({
                method: 'GET', url: url
            }).
            success(function (data, status, headers, config) {
                self.itemCount = data.count;
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });
            return deferred.promise;
        }

        return {

            constructor: DataTable,

            /**
             * Full loading of count and datas
             * @returns {deferred.promise|{then}|{then, catch, finally}}
             */
            load: function () {
                var deferred = $q.defer();
                if (this.itemCount && needUpdateCount == 0) {
                    index.call(this).then(function () {
                        deferred.resolve();
                    }, deferred.reject);
                }
                else {
                    var self = this;
                    count.call(self).then(function () {
                        updatePagination.call(self);
                        index.call(self).then(function () {
                            deferred.resolve();
                        }, deferred.reject);
                    }, deferred.reject);
                }
                return deferred.promise;
            },
            /**
             * Sort data by a given field name
             * @param field field name to use for sorting
             */
            sort: function (field) {
                this.sortField = field;
                if (this.sortOrder == DESC) {
                    this.sortOrder = ASC;
                }
                else {
                    this.sortOrder = DESC;
                }
                this.load();
            },
            /**
             * Return true if the current sortOrder is ASC, false otherwise
             */
            isASC: function () {
                return this.sortOrder == ASC;
            },
            filterBy: function (field, value) {
                if (value && value.length > 0) {
                    this.where[field] = value;
                }
                else {
                    var i = this.where.indexOf(field);
                    this.where.splice(i, 1);
                }
                console.log(this.where);
            },
            filter: function () {
                needUpdateCount = 1;
                this.load();
            }
        };
    })();
    return DataTable;
});

tooFrench.directive('alexTable', function () {
    return {
        restrict: 'E',
        scope: {
            model: '='
        },
        templateUrl: 'views/directives/datatable.html'
    };
});
