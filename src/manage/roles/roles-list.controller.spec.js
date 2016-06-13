'use strict';

xdescribe('Controller: Roles List', function() {
  var $scope,
    $rootscope,
    $q,
    $controller,
    RoleService;

  var pagedRoles = {
    '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
    '@type': 'PagedCollection',
    'itemsPerPage': 50,
    'totalItems': 19,
    'member': getRoles(),
    'firstPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1',
    'lastPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1',
    'nextPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1'
  };

  function getRoles() {
    return {
      'roles': [
        {
          'id': '1',
          'name': 'admin',
          'permissions': [
            {
              'id': '1',
              'name': 'abc'
            },
            {
              'id': '2',
              'name': 'def'
            },
            {
              'id': '3',
              'name': 'ghi'
            }
          ],
          'users':[
            {
              'id': '1',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '2',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '3',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '4',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '5',
              'email': 'info@mail.com',
              'nick': 'nickname'
            }],
          'labels': [
            {
              'id': '1',
              'name': 'label 1'
            },
            {
              'id': '2',
              'name': 'label 2'
            },
            {
              'id': '3',
              'name': 'label 3'
            }
          ]
        },
        {
          'id': '2',
          'name': 'moderator',
          'permissions': [
            {
              'id': '1',
              'name': 'abc'
            },
            {
              'id': '2',
              'name': 'def'
            },
            {
              'id': '3',
              'name': 'ghi'
            }
          ],
          'users':[
            {
              'id': '1',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '2',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '3',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '4',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '5',
              'email': 'info@mail.com',
              'nick': 'nickname'
            }],
          'labels': [
            {
              'id': '1',
              'name': 'label 1'
            },
            {
              'id': '2',
              'name': 'label 2'
            },
            {
              'id': '3',
              'name': 'label 3'
            }
          ]
        },
        {
          'id': '3',
          'name': 'wannabe admin',
          'permissions': [
            {
              'id': '1',
              'name': 'abc'
            },
            {
              'id': '2',
              'name': 'def'
            },
            {
              'id': '3',
              'name': 'ghi'
            }
          ],
          'users':[
            {
              'id': '1',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '2',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '3',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '4',
              'email': 'info@mail.com',
              'nick': 'nickname'
            },
            {
              'id': '5',
              'email': 'info@mail.com',
              'nick': 'nickname'
            }],
          'labels': [
            {
              'id': '1',
              'name': 'label 1'
            },
            {
              'id': '2',
              'name': 'label 2'
            },
            {
              'id': '3',
              'name': 'label 3'
            }
          ]
        }
      ],
      'itemsPerPage': 10,
      'totalItems': 19
    }
  };

  beforeEach(module('udb.manage'));
  beforeEach(module('udb.manage.roles'));

  beforeEach(inject(function($rootScope, _$q_, _$controller_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootscope = $rootScope;
    $scope = $rootScope.$new();
  }));

  beforeEach(function () {
    RoleService = jasmine.createSpyObj('RoleService', ['find']);
    RoleService.find.and.returnValue($q.resolve(getRoles()));
  });

  function getController() {
    return $controller(
      'RolesListController', {
        $scope: $scope,
        $rootScope: $rootscope,
        UserService: RoleService
      }
    );
  }

  it('initialise the roles list', function() {
    var controller = getController();
    $scope.$digest();

    expect(controller.roles).toEqual(getRoles().roles);
  });

  it('should catch the emit and find the roles', function() {
    var controller = getController();
    spyOn(controller, 'findRoles');
    $rootscope.$emit('roleSearchSubmitted', {query: 'asdf'});

    expect(controller.findRoles).toHaveBeenCalledWith('asdf');
  });
});
