describe('Service: RoleService', function () {

  var $q, RoleService;

  beforeEach(inject(function (_$q_) {
    $q = _$q_;
    RoleService = jasmine.createSpyObj('RoleService', ['find']);
  }));

  function getRoles() {
    return [
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
    ];
  }

  it('should find the roles', function () {
    var roles = getRoles();
    RoleService.find.and.returnValue(roles);

    expect(RoleService.find()).toEqual(roles);
  });
});
