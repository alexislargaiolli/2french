/**
 * Created by alex on 09/11/15.
 */
var tooFrenchApp = angular.module('tooFrenchApp');
tooFrenchApp.service('Tour', function ($translate, $state, $http, Session) {
        this.startTeacherTour = function () {
            var tour;
            tour = new Tour({
                name: "tourteacher",
                debug: false,
                storage: false,
                onEnd: function (tour) {
                    if (tour.notOver == 1) {
                        $state.go('myprofile');
                    }
                    else {
                        Session.user.tour = true;
                        $http.get('/user/userEndTour');
                    }
                },
                template: "<div class='popover tour'>" +
                "<div class='arrow'></div>" +
                "<h3 class='popover-title'></h3>" +
                "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                "<div class='popover-content'></div>" +
                "<div class='popover-navigation'>" +
                "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                "</div>" +
                "</nav>" +
                "</div>",
                steps: [
                    {
                        element: "#logo",
                        title: $translate.instant('tour.1.title'),
                        content: $translate.instant('tour.2.content'),
                        placement: 'right',
                        backdrop: true,
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    },
                    {
                        element: "#link-myprofile",
                        title: $translate.instant('tour.2.title'),
                        content: $translate.instant('tour.2.content'),
                        backdrop: true,
                        placement: 'left',
                        onNext: function (tour) {
                            tour.notOver = 1;
                            tour.end();
                        },
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                        "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    }
                ]
            });
            tour.init();
            tour.start();
        };

        this.startStudentTour = function () {
            var tourStudent;
            tourStudent = new Tour({
                name: "tourstudent",
                debug: false,
                storage: false,
                onEnd: function (tour) {
                    Session.user.tour = true;
                    $http.get('/user/userEndTour');
                },
                template: "<div class='popover tour'>" +
                "<div class='arrow'></div>" +
                "<h3 class='popover-title'></h3>" +
                "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                "<div class='popover-content'></div>" +
                "<div class='popover-navigation'>" +
                "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                "</div>" +
                "</nav>" +
                "</div>",
                steps: [
                    {
                        element: "#logo",
                        title: $translate.instant('tour.student.1.title'),
                        content: $translate.instant('tour.student.1.content'),
                        placement: 'right',
                        backdrop: true,
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    },
                    {
                        element: "#searchBar",
                        title: $translate.instant('tour.student.2.title'),
                        content: $translate.instant('tour.student.2.content'),
                        backdrop: true,
                        placement: 'bottom'
                    },
                    {
                        element: "#link-planning",
                        title: $translate.instant('tour.student.3.title'),
                        content: $translate.instant('tour.student.3.content'),
                        backdrop: true,
                        placement: 'bottom'
                    },
                    {
                        element: "#link-message",
                        title: $translate.instant('tour.student.4.title'),
                        content: $translate.instant('tour.student.4.content'),
                        backdrop: true,
                        placement: 'bottom'
                    },
                    {
                        element: "#link-myteachers",
                        title: $translate.instant('tour.student.5.title'),
                        content: $translate.instant('tour.student.5.content'),
                        backdrop: true,
                        placement: 'bottom'
                    },
                    {
                        element: "#link-forum",
                        title: $translate.instant('tour.student.6.title'),
                        content: $translate.instant('tour.student.6.content'),
                        backdrop: true,
                        placement: 'bottom'
                    }, {
                        element: "#logo",
                        title: $translate.instant('tour.student.7.title'),
                        content: $translate.instant('tour.student.7.content'),
                        backdrop: true,
                        placement: 'bottom',
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    }
                ]
            });
            tourStudent.init();
            tourStudent.start();
        }

        this.startProfileTour = function(){
            var tourProfile = new Tour({
                name: "myprofile",
                debug: false,
                storage: false,
                onEnd: function (tourr) {
                    Session.user.tour = true;
                    $http.get('/user/userEndTour');
                },
                template: "<div class='popover tour'>" +
                "<div class='arrow'></div>" +
                "<h3 class='popover-title'></h3>" +
                "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>"+
                "<div class='popover-content'></div>" +
                "<div class='popover-navigation'>" +
                "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                "</div>" +
                "</nav>" +
                "</div>",
                steps: [
                    {
                        element: "#profile-header",
                        title: $translate.instant('tour.3.title'),
                        content: $translate.instant('tour.3.content'),
                        placement: 'left',
                        backdrop: true
                    },
                    {
                        element: "#profile-formulas-panel",
                        title: $translate.instant('tour.4.title'),
                        content: $translate.instant('tour.4.content'),
                        placement: 'left',
                        backdrop: true
                    },
                    {
                        element: "#profile-accomodation-panel",
                        title: $translate.instant('tour.5.title'),
                        content: $translate.instant('tour.5.content'),
                        placement: 'left',
                        backdrop: true
                    },
                    {
                        element: "#profile-left",
                        title: $translate.instant('tour.6.title'),
                        content: $translate.instant('tour.6.content'),
                        placement: 'right',
                        backdrop: true
                    },
                    {
                        element: "#profile-completion-wrapper",
                        title: $translate.instant('tour.7.title'),
                        content: $translate.instant('tour.7.content'),
                        placement: 'bottom',
                        backdrop: true
                    },
                    {
                        element: "#link-planning",
                        title: $translate.instant('tour.8.title'),
                        content: $translate.instant('tour.8.content'),
                        backdrop: true,
                        placement: 'left'
                    },
                    {
                        element: "#link-message",
                        title: $translate.instant('tour.9.title'),
                        content: $translate.instant('tour.9.content'),
                        backdrop: true,
                        placement: 'left'
                    },
                    {
                        element: "#link-forum",
                        title: $translate.instant('tour.11.title'),
                        content: $translate.instant('tour.11.content'),
                        backdrop: true,
                        placement: 'left'
                    },
                    {
                        element: "#logo",
                        title: $translate.instant('tour.12.title'),
                        content: $translate.instant('tour.12.content'),
                        placement: 'right',
                        backdrop: true,
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>"+
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    }
                ]
            });
            tourProfile.init();
            tourProfile.start();
        }
    }
);