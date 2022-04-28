const DocMenuConfig = [
    // 循环1
    {
      pages: [
        {
          heading: "仪表板",
          route: "/dashboard",
          svgIcon: "media/icons/duotune/art/art002.svg",
          fontIcon: "bi-app-indicator",
        }
      ],
    },
    // 循环2
    {
      heading: "功能",
      route: "/crafted",
      pages: [
        {
          sectionTitle: "用户资料",
          route: "/account",
          svgIcon: "media/icons/duotune/communication/com006.svg",
          fontIcon: "bi-person",
          sub: [
            {
              heading: "用户个人资料",
              route: "/crafted/account/overview",
            },
            {
              heading: "用户设置",
              route: "/crafted/account/settings",
            },
          ],
        },
      ],
    },
    // 循环3
    {
      heading: "应用",
      route: "/apps",
      pages: [
        {
          sectionTitle: "用户管理",
          route: "/customers",
          svgIcon: "media/icons/duotune/finance/fin006.svg",
          fontIcon: "bi-printer",
          sub: [
            {
              sectionTitle: "用户",
              route: "/customers",
              // svgIcon: "media/icons/duotune/finance/fin006.svg",
              fontIcon: "bi-printer",
              sub: [
                {
                  heading: "用户名单",
                  route: "/apps/customers/customers-listing",
                },
                {
                  heading: "查看用户",
                  route: "/apps/customers/customer-details",
                },
              ],
            },
            {
              sectionTitle: "角色",
              route: "/customers",
              // svgIcon: "media/icons/duotune/finance/fin006.svg",
              fontIcon: "bi-printer",
              sub: [
                {
                  heading: "角色列表",
                  route: "/apps/customers/role-list",
                },
                {
                  heading: "查看角色",
                  route: "/apps/customers/view-roles",
                },
              ],
            },
          ],
        }
      ],
    },
  ];
  
  export default DocMenuConfig;
  