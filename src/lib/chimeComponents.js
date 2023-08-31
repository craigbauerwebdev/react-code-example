/* eslint-disable */
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var React = require("react");
var styledSystem = require("styled-system");
var styled = require("styled-components");
var crypto = require("crypto");
var reactDom = require("react-dom");
var amazonChimeSdkJs = require("amazon-chime-sdk-js");
var chimeStyles = require("./scss/chime.module.scss");
var Logger = require("js-logger");

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/ _interopDefaultLegacy(styled);
var crypto__default = /*#__PURE__*/ _interopDefaultLegacy(crypto);

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var baseStyles = function (_a) {
  var css = _a.css;
  return css ? "@media { " + css + " };" : "";
};
var baseSpacing = function (props) {
  return styledSystem.space(props);
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledBadge = styled__default["default"].span(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        "\n  ",
        "\n  display: inline-block;\n  padding: ",
        ";\n  border-radius: 0.5rem;\n  line-height: ",
        ";\n  color: ",
        ";\n  font-size: 0.65rem;\n  background-color: ",
        ";\n\n  ",
        ";\n  ",
        "\n",
      ],
      [
        "\n  ",
        "\n  display: inline-block;\n  padding: ",
        ";\n  border-radius: 0.5rem;\n  line-height: ",
        ";\n  color: ",
        ";\n  font-size: 0.65rem;\n  background-color: ",
        ";\n\n  ",
        ";\n  ",
        "\n",
      ]
    )),
  function (props) {
    if (typeof props.value === "object") {
      var element = props.value;
      var width = (element.props && element.props.width) || "1rem";
      return "width: " + width + ";";
    }
    return null;
  },
  function (props) {
    return typeof props.value === "object" ? "0" : "0.1rem 0.4rem 0.125rem";
  },
  function (props) {
    return typeof props.value === "object" ? "1" : "1.43";
  },
  function (props) {
    return props.theme.colors.greys.white;
  },
  function (props) {
    return props.status === "alert"
      ? props.theme.colors.error.primary
      : props.theme.colors.greys.grey60;
  },
  baseSpacing,
  baseStyles
);
var templateObject_1;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign =
  (undefined && undefined.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Badge = function (_a) {
  var value = _a.value,
    _b = _a.status,
    status = _b === void 0 ? "default" : _b,
    className = _a.className,
    tag = _a.tag,
    rest = __rest(_a, ["value", "status", "className", "tag"]);
  return React__default["default"].createElement(
    StyledBadge,
    __assign(
      {
        className: className || "",
        as: tag,
        status: status,
        value: value,
        "data-testid": "badge",
      },
      rest
    ),
    value
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$1 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
// use for elements that contain text for screen readers, but need no visual representation
var visuallyHidden = styled.css(
  templateObject_1$1 ||
    (templateObject_1$1 = __makeTemplateObject$1(
      [
        "\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  position: absolute !important;\n",
      ],
      [
        "\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  position: absolute !important;\n",
      ]
    ))
);
var ellipsis = styled.css(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject$1(
      [
        "\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n",
      ],
      [
        "\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n",
      ]
    ))
);
var absoluteCenter = styled.css(
  templateObject_3 ||
    (templateObject_3 = __makeTemplateObject$1(
      [
        "\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n",
      ],
      [
        "\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n",
      ]
    ))
);
var isValidCSSHex = function (hex) {
  // matches 6 digit characters prefixed with a '#'.
  return /^#[0-9A-F]{6}$/i.test(hex);
};
var hexTorgba = function (hex, alpha) {
  var _a;
  if (alpha === void 0) {
    alpha = 1;
  }
  if (!isValidCSSHex(hex)) {
    return "";
  }
  var _b =
      (_a = hex.match(/\w\w/g)) === null || _a === void 0
        ? void 0
        : _a.map(function (h) {
            return parseInt(h, 16);
          }),
    r = _b[0],
    g = _b[1],
    b = _b[2];
  return "rgba(" + r + ", " + g + ", " + b + ", " + (alpha || 1) + ")";
};
var templateObject_1$1, templateObject_2, templateObject_3;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$2 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledButton = styled__default["default"].button(
  templateObject_1$2 ||
    (templateObject_1$2 = __makeTemplateObject$2(
      [
        "\n  border-radius: ",
        ";\n  font-size: ",
        ";\n  padding: 0.5rem 1rem;\n  border-color: transparent;\n  transition: background-color 0.1s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  .ch-icon {\n    width: ",
        ";\n    height: ",
        ";\n    margin-right: 0.25rem;\n  }\n\n  /* variant styles */\n  ",
        "\n  ",
        "\n  ",
        "\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  border-radius: ",
        ";\n  font-size: ",
        ";\n  padding: 0.5rem 1rem;\n  border-color: transparent;\n  transition: background-color 0.1s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  .ch-icon {\n    width: ",
        ";\n    height: ",
        ";\n    margin-right: 0.25rem;\n  }\n\n  /* variant styles */\n  ",
        "\n  ",
        "\n  ",
        "\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.radii.default;
  },
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.iconButtonSizes[props.iconSize || "sm"];
  },
  function (props) {
    return props.theme.iconButtonSizes[props.iconSize || "sm"];
  },
  function (props) {
    return props.variant === "primary" && StyledPrimaryButton;
  },
  function (props) {
    return props.variant === "secondary" && StyledSecondaryButton;
  },
  function (props) {
    return props.variant === "icon" && StyledIconButton;
  },
  baseSpacing,
  baseStyles
);
var StyledPrimaryButton = styled.css(
  templateObject_2$1 ||
    (templateObject_2$1 = __makeTemplateObject$2(
      [
        "\n  background-color: ",
        ";\n  color: ",
        ";\n  border: ",
        ";\n  box-shadow: ",
        ";\n\n  &:focus {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:hover {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:focus:hover {\n    box-shadow: ",
        ";\n  }\n\n  &:active {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:disabled {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    cursor: not-allowed;\n  }\n",
      ],
      [
        "\n  background-color: ",
        ";\n  color: ",
        ";\n  border: ",
        ";\n  box-shadow: ",
        ";\n\n  &:focus {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:hover {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:focus:hover {\n    box-shadow: ",
        ";\n  }\n\n  &:active {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:disabled {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    cursor: not-allowed;\n  }\n",
      ]
    )),
  function (props) {
    return props.selected
      ? props.theme.buttons.primary.selected.bgd
      : props.theme.buttons.primary.static.bgd;
  },
  function (props) {
    return props.selected
      ? props.theme.buttons.primary.selected.text
      : props.theme.buttons.primary.static.text;
  },
  function (props) {
    return props.selected
      ? props.theme.buttons.primary.selected.border
      : props.theme.buttons.primary.static.border;
  },
  function (props) {
    return props.theme.buttons.primary.static.shadow;
  },
  function (props) {
    return props.theme.buttons.primary.focus.bgd;
  },
  function (props) {
    return props.theme.buttons.primary.focus.border;
  },
  function (props) {
    return props.theme.buttons.primary.focus.text;
  },
  function (props) {
    return props.theme.buttons.primary.focus.shadow;
  },
  function (props) {
    return props.theme.buttons.primary.hover.bgd;
  },
  function (props) {
    return props.theme.buttons.primary.hover.border;
  },
  function (props) {
    return props.theme.buttons.primary.hover.text;
  },
  function (props) {
    return props.theme.buttons.primary.hover.shadow;
  },
  function (props) {
    return props.theme.buttons.primary.focus.shadow;
  },
  function (props) {
    return props.theme.buttons.primary.active.bgd;
  },
  function (props) {
    return props.theme.buttons.primary.active.border;
  },
  function (props) {
    return props.theme.buttons.primary.active.text;
  },
  function (props) {
    return props.theme.buttons.primary.active.shadow;
  },
  function (props) {
    return props.theme.buttons.primary.disabled.bgd;
  },
  function (props) {
    return props.theme.buttons.primary.disabled.border;
  },
  function (props) {
    return props.theme.buttons.primary.disabled.text;
  }
);
var StyledSecondaryButton = styled.css(
  templateObject_3$1 ||
    (templateObject_3$1 = __makeTemplateObject$2(
      [
        "\n  background-color: ",
        ";\n  color: ",
        ";\n  border: ",
        ";\n  box-shadow: ",
        ";\n\n  &:focus {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:hover {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:focus:hover {\n    box-shadow: ",
        ";\n  }\n\n  &:active {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:disabled {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    cursor: not-allowed;\n  }\n",
      ],
      [
        "\n  background-color: ",
        ";\n  color: ",
        ";\n  border: ",
        ";\n  box-shadow: ",
        ";\n\n  &:focus {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:hover {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:focus:hover {\n    box-shadow: ",
        ";\n  }\n\n  &:active {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:disabled {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    cursor: not-allowed;\n  }\n",
      ]
    )),
  function (props) {
    return props.selected
      ? props.theme.buttons.secondary.selected.bgd
      : props.theme.buttons.secondary.static.bgd;
  },
  function (props) {
    return props.selected
      ? props.theme.buttons.secondary.selected.text
      : props.theme.buttons.secondary.static.text;
  },
  function (props) {
    return props.selected
      ? props.theme.buttons.secondary.selected.border
      : props.theme.buttons.secondary.static.border;
  },
  function (props) {
    return props.theme.buttons.secondary.shadow;
  },
  function (props) {
    return props.theme.buttons.secondary.focus.bgd;
  },
  function (props) {
    return props.theme.buttons.secondary.focus.border;
  },
  function (props) {
    return props.theme.buttons.secondary.focus.text;
  },
  function (props) {
    return props.theme.buttons.secondary.focus.shadow;
  },
  function (props) {
    return props.theme.buttons.secondary.hover.bgd;
  },
  function (props) {
    return props.theme.buttons.secondary.hover.border;
  },
  function (props) {
    return props.theme.buttons.secondary.hover.text;
  },
  function (props) {
    return props.theme.buttons.secondary.hover.shadow;
  },
  function (props) {
    return props.theme.buttons.secondary.focus.shadow;
  },
  function (props) {
    return props.theme.buttons.secondary.active.bgd;
  },
  function (props) {
    return props.theme.buttons.secondary.active.border;
  },
  function (props) {
    return props.theme.buttons.secondary.active.text;
  },
  function (props) {
    return props.theme.buttons.secondary.focus.shadow;
  },
  function (props) {
    return props.theme.buttons.secondary.disabled.bgd;
  },
  function (props) {
    return props.theme.buttons.secondary.disabled.border;
  },
  function (props) {
    return props.theme.buttons.secondary.disabled.text;
  }
);
var StyledIconButton = styled.css(
  templateObject_4 ||
    (templateObject_4 = __makeTemplateObject$2(
      [
        "\n  background-color: ",
        ";\n  color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  padding: 0.1875rem;\n  position: relative;\n\n  > .ch-label {\n    ",
        ";\n  }\n\n  > .ch-icon {\n    width: ",
        ";\n    height: ",
        ";\n    margin: 0;\n  }\n\n  &:focus {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:hover {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n  }\n\n  &:active {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n  }\n\n  &:disabled {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    cursor: not-allowed;\n  }\n",
      ],
      [
        "\n  background-color: ",
        ";\n  color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  padding: 0.1875rem;\n  position: relative;\n\n  > .ch-label {\n    ",
        ";\n  }\n\n  > .ch-icon {\n    width: ",
        ";\n    height: ",
        ";\n    margin: 0;\n  }\n\n  &:focus {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    color: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  &:hover {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n  }\n\n  &:active {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n  }\n\n  &:disabled {\n    background-color: ",
        ";\n    border: ",
        ";\n    color: ",
        ";\n    cursor: not-allowed;\n  }\n",
      ]
    )),
  function (props) {
    return props.selected
      ? props.theme.buttons.icon.selected.bgd
      : props.theme.buttons.icon.static.bgd;
  },
  function (props) {
    return props.selected
      ? props.theme.buttons.icon.selected.text
      : props.theme.buttons.icon.static.text;
  },
  function (props) {
    return props.selected
      ? props.theme.buttons.icon.selected.border
      : props.theme.buttons.icon.static.border;
  },
  function (props) {
    return props.theme.radii.circle;
  },
  visuallyHidden,
  function (props) {
    return props.theme.iconButtonSizes[props.iconSize || "sm"];
  },
  function (props) {
    return props.theme.iconButtonSizes[props.iconSize || "sm"];
  },
  function (_a) {
    var theme = _a.theme,
      selected = _a.selected;
    return selected
      ? theme.buttons.icon.selected.bgd
      : theme.buttons.icon.static.bgd;
  },
  function (props) {
    return props.theme.buttons.icon.focus.border;
  },
  function (props) {
    return props.theme.buttons.icon.focus.text;
  },
  function (_a) {
    var theme = _a.theme,
      selected = _a.selected;
    return selected
      ? theme.buttons.icon.selected.text
      : theme.buttons.icon.static.text;
  },
  function (props) {
    return props.theme.buttons.icon.focus.shadow;
  },
  function (props) {
    return props.theme.buttons.icon.hover.bgd;
  },
  function (props) {
    return props.theme.buttons.icon.hover.border;
  },
  function (props) {
    return props.theme.buttons.icon.hover.text;
  },
  function (props) {
    return props.theme.buttons.icon.active.bgd;
  },
  function (props) {
    return props.theme.buttons.icon.active.border;
  },
  function (props) {
    return props.theme.buttons.icon.active.text;
  },
  function (props) {
    return props.theme.buttons.icon.disabled.bgd;
  },
  function (props) {
    return props.theme.buttons.icon.disabled.border;
  },
  function (props) {
    return props.theme.buttons.icon.disabled.text;
  }
);
var templateObject_1$2,
  templateObject_2$1,
  templateObject_3$1,
  templateObject_4;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1.apply(this, arguments);
  };
var Button = React.forwardRef(function (props, ref) {
  return React__default["default"].createElement(
    StyledButton,
    __assign$1({}, props, {
      className: props.className || "",
      as: props.tag,
      ref: ref,
      "aria-label": props.label,
      "data-testid": "button",
      disabled: props.disabled,
    }),
    props.icon &&
      React__default["default"].createElement(
        "span",
        { className: "ch-icon", "data-testid": "button-icon" },
        props.icon
      ),
    React__default["default"].createElement(
      "span",
      { className: "ch-label", "data-testid": "button-label" },
      props.label
    )
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$2 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$2 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$2.apply(this, arguments);
  };
var PrimaryButton = React.forwardRef(function (props, ref) {
  return React__default["default"].createElement(
    Button,
    __assign$2({ variant: "primary" }, props)
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$3 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$3 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$3.apply(this, arguments);
  };
var SecondaryButton = React.forwardRef(function (props, ref) {
  return React__default["default"].createElement(
    Button,
    __assign$3({ variant: "secondary" }, props)
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$4 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$4 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$4.apply(this, arguments);
  };
var IconButton = React.forwardRef(function (props, ref) {
  return React__default["default"].createElement(
    Button,
    __assign$4({ ref: ref, variant: "icon" }, props)
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$3 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var HiddenCheckbox = styled__default["default"].input(
  templateObject_1$3 ||
    (templateObject_1$3 = __makeTemplateObject$3(
      [
        "\n  ",
        ";\n\n  &[aria-invalid='true'] + .ch-checkbox {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n",
      ],
      [
        "\n  ",
        ";\n\n  &[aria-invalid='true'] + .ch-checkbox {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n",
      ]
    )),
  visuallyHidden,
  function (props) {
    return props.theme.inputs.error.border;
  },
  function (props) {
    return props.theme.inputs.error.shadow;
  }
);
var StyledCheckbox = styled__default["default"].div(
  templateObject_2$2 ||
    (templateObject_2$2 = __makeTemplateObject$3(
      [
        "\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  color: ",
        ";\n  display: inline-block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n  transition: box-shadow 0.05s ease-in;\n\n  > svg {\n    left: -0.03125rem;\n    position: absolute;\n    transform: scale(1.5);\n  }\n\n  ",
        ":checked ~ & {\n    background-color: ",
        ";\n    border: ",
        ";\n    box-shadow: ",
        ";\n    color: ",
        ";\n  }\n\n  ",
        ":focus ~ & {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n",
      ],
      [
        "\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  color: ",
        ";\n  display: inline-block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n  transition: box-shadow 0.05s ease-in;\n\n  > svg {\n    left: -0.03125rem;\n    position: absolute;\n    transform: scale(1.5);\n  }\n\n  ",
        ":checked ~ & {\n    background-color: ",
        ";\n    border: ",
        ";\n    box-shadow: ",
        ";\n    color: ",
        ";\n  }\n\n  ",
        ":focus ~ & {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.inputs.bgd;
  },
  function (props) {
    return props.theme.inputs.border;
  },
  function (props) {
    return props.theme.radii.default;
  },
  function (props) {
    return props.theme.inputs.shadow;
  },
  function (props) {
    return props.theme.inputs.fontColor;
  },
  HiddenCheckbox,
  function (props) {
    return props.theme.inputs.checked.bgd;
  },
  function (props) {
    return props.theme.inputs.checked.border;
  },
  function (props) {
    return props.theme.inputs.checked.shadow;
  },
  function (props) {
    return props.theme.inputs.checked.fontColor;
  },
  HiddenCheckbox,
  function (props) {
    return props.theme.inputs.focus.border;
  },
  function (props) {
    return props.theme.inputs.focus.shadow;
  }
);
var templateObject_1$3, templateObject_2$2;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$5 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$5 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$5.apply(this, arguments);
  };
var __rest$1 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Svg = function (_a) {
  var className = _a.className,
    children = _a.children,
    _b = _a.viewBox,
    viewBox = _b === void 0 ? "0 0 24 24" : _b,
    _c = _a.xmlns,
    xmlns = _c === void 0 ? "http://www.w3.org/2000/svg" : _c,
    width = _a.width,
    height = _a.height,
    title = _a.title,
    otherProps = __rest$1(_a, [
      "className",
      "children",
      "viewBox",
      "xmlns",
      "width",
      "height",
      "title",
    ]);
  // This is necessary because some versions of Firefox would not use rems as values
  // for width and height attributes: https://bugzilla.mozilla.org/show_bug.cgi?id=1231147
  var styles = {
    width: width,
    height: height,
  };
  return React__default["default"].createElement(
    "svg",
    __assign$5(
      {
        xmlns: xmlns,
        className: "Svg " + (className || ""),
        height: height,
        style: styles,
        viewBox: viewBox,
        width: width,
      },
      otherProps
    ),
    title && React__default["default"].createElement("title", null, title),
    React__default["default"].createElement(
      "g",
      { fillRule: "evenodd", fill: "currentColor" },
      children
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$6 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$6 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$6.apply(this, arguments);
  };
var Add = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$6({}, props),
    React__default["default"].createElement("path", {
      d:
        "M14.5 5C16.981 5 19 7.019 19 9.5v5c0 2.481-2.019 4.5-4.5 4.5h-5C7.019 19 5 16.981 5 14.5v-5C5 7.019 7.019 5 9.5 5zm0 1h-5C7.57 6 6 7.57 6 9.5v5C6 16.43 7.57 18 9.5 18h5c1.93 0 3.5-1.57 3.5-3.5v-5C18 7.57 16.43 6 14.5 6zM12 8.467c.276 0 .5.223.5.5V11.5h2.533c.276 0 .5.224.5.5s-.224.5-.5.5H12.5v2.533c0 .277-.224.5-.5.5-.277 0-.5-.223-.5-.5V12.5H8.967c-.277 0-.5-.224-.5-.5s.223-.5.5-.5H11.5V8.967c0-.277.223-.5.5-.5z",
    })
  );
};
Add.displayName = "Add";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$4 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __assign$7 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$7 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$7.apply(this, arguments);
  };
var __rest$2 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var dirTransform = {
  up: "0",
  right: "90",
  down: "180",
  left: "270",
};
var StyledArrow = styled__default["default"](Svg)(
  templateObject_1$4 ||
    (templateObject_1$4 = __makeTemplateObject$4(
      ["\n  transform: ", ";\n"],
      ["\n  transform: ", ";\n"]
    )),
  function (_a) {
    var direction = _a.direction;
    return "rotate(" + dirTransform[direction || "up"] + "deg)";
  }
);
var Arrow = function (_a) {
  var _b = _a.direction,
    direction = _b === void 0 ? "up" : _b,
    rest = __rest$2(_a, ["direction"]);
  return React__default["default"].createElement(
    StyledArrow,
    __assign$7({ direction: direction }, rest),
    React__default["default"].createElement("path", {
      "transform-origin": "center",
      d:
        "M16.85 10.53l-4.495-4.39c-.094-.09-.214-.132-.335-.136C12.013 6.003 12.007 6 12 6c-.006 0-.012.003-.02.004-.12.004-.24.047-.334.137L7.15 10.53c-.197.193-.201.51-.008.707.098.1.228.15.357.15.126 0 .252-.046.35-.141l3.646-3.56v9.812c0 .277.223.5.5.5.276 0 .5-.223.5-.5V7.677l3.655 3.57c.097.095.223.142.349.142.13 0 .26-.05.358-.151.193-.197.189-.514-.008-.707",
    })
  );
};
Arrow.displayName = "Arrow";
var templateObject_1$4;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$8 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$8 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$8.apply(this, arguments);
  };
var Attachment = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$8({}, props),
    React__default["default"].createElement("path", {
      d:
        "M9.388 18.995c-1.171 0-2.337-.44-3.196-1.312-.804-.816-1.227-1.885-1.19-3.011.037-1.137.536-2.192 1.407-2.967l6.629-5.91c1.246-1.108 3.201-1.051 4.359.127.57.578.869 1.337.84 2.135-.031.799-.383 1.538-.994 2.08l-6.41 5.715c-.365.328-.841.494-1.303.462-.454-.011-.898-.202-1.227-.536-.335-.34-.509-.786-.491-1.255.016-.467.222-.9.58-1.219l6.211-5.538c.207-.185.522-.165.706.041.183.206.166.522-.04.706l-6.211 5.538c-.154.137-.239.313-.246.509-.008.195.062.373.204.517.146.148.347.233.563.239.213.016.423-.062.587-.209l6.412-5.717c.406-.36.639-.846.659-1.37.019-.52-.177-1.015-.552-1.396-.793-.805-2.129-.841-2.982-.083l-6.628 5.91c-.665.592-1.045 1.392-1.074 2.253-.027.85.293 1.659.903 2.277 1.285 1.303 3.456 1.363 4.834.134l6.429-5.731c.207-.184.522-.166.706.041.184.206.166.522-.04.705l-6.429 5.731c-.851.759-1.936 1.134-3.016 1.134",
    })
  );
};
Attachment.displayName = "Attachment";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$9 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$9 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$9.apply(this, arguments);
  };
var Attendees = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$9({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12.105 12.923c1.596 0 2.895 1.3 2.895 2.895v2.105H6v-2.105c0-1.596 1.299-2.895 2.895-2.895zm3.767.571c.139-.24.447-.32.684-.182.89.517 1.444 1.477 1.444 2.506v1.605c0 .277-.223.5-.5.5-.276 0-.5-.223-.5-.5v-1.605c0-.673-.362-1.302-.946-1.641-.238-.138-.32-.444-.182-.683zm-3.767.43h-3.21c-1.045 0-1.895.85-1.895 1.894v1.105h7v-1.105c0-1.045-.85-1.895-1.895-1.895zM10.645 6c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm3.385.488c.096-.259.386-.39.642-.298 1.18.433 1.972 1.562 1.972 2.81s-.793 2.377-1.972 2.81c-.057.02-.115.03-.172.03-.204 0-.396-.126-.47-.328-.095-.26.038-.547.298-.642.787-.288 1.316-1.04 1.316-1.87 0-.83-.529-1.582-1.316-1.87-.26-.095-.393-.383-.298-.642zM10.645 7c-1.104 0-2 .897-2 2s.896 2 2 2c1.103 0 2-.897 2-2s-.897-2-2-2z",
    })
  );
};
Attendees.displayName = "Attendees";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$a =
  (undefined && undefined.__assign) ||
  function () {
    __assign$a =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$a.apply(this, arguments);
  };
var __rest$3 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Camera = function (_a) {
  var _b = _a.disabled,
    disabled = _b === void 0 ? false : _b,
    rest = __rest$3(_a, ["disabled"]);
  return React__default["default"].createElement(
    Svg,
    __assign$a({}, rest),
    disabled
      ? React__default["default"].createElement("path", {
          xmlns: "http://www.w3.org/2000/svg",
          d:
            "M4.146 4.146c.196-.195.512-.195.708 0L7.707 7h.007l1 1h-.007L15 14.293v-.007l.894.894-.001.006 3.961 3.96c.195.196.195.512 0 .708-.098.097-.226.146-.354.146-.128 0-.256-.049-.354-.146l-3.747-3.748c-.459.542-1.134.894-1.899.894h-7C5.121 17 4 15.879 4 14.5v-5c0-1.314 1.022-2.383 2.312-2.481L4.146 4.854c-.195-.196-.195-.512 0-.708zM7.293 8H6.5C5.673 8 5 8.673 5 9.5v5c0 .827.673 1.5 1.5 1.5h7c.488 0 .919-.238 1.192-.601L7.293 8zM13.5 7C14.879 7 16 8.121 16 9.5v.566l1.813-1.303c.426-.306.983-.349 1.456-.107.451.231.731.684.731 1.181v4.326c0 .497-.28.95-.731 1.181-.205.104-.424.156-.642.156-.287 0-.571-.089-.814-.263l-1.592-1.144L15 12.873V9.5c0-.827-.673-1.5-1.5-1.5h-3.372l-1-1zm5.313 2.546c-.051-.026-.233-.1-.416.03l-2.256 1.621c-.089.064-.141.16-.141.262v1.082c0 .102.051.197.141.262l2.256 1.622c.182.131.365.054.416.03.055-.029.187-.116.187-.292V9.837c0-.176-.132-.263-.187-.29z",
        })
      : React__default["default"].createElement("path", {
          d:
            "M19 14.164c0 .176-.131.262-.187.29-.052.027-.234.1-.416-.028l-2.256-1.622v-.001c-.09-.064-.141-.16-.141-.262v-1.082c0-.102.051-.197.141-.262l2.255-1.622c.081-.057.159-.075.227-.075.09 0 .16.03.19.046.056.029.187.115.187.29v4.328zm-4 .336c0 .828-.673 1.5-1.5 1.5h-7c-.827 0-1.5-.672-1.5-1.5v-5C5 8.673 5.673 8 6.5 8h7c.827 0 1.5.673 1.5 1.5v5zm4.27-5.843c-.471-.242-1.028-.202-1.457.106L16 10.066V9.5C16 8.122 14.879 7 13.5 7h-7C5.121 7 4 8.122 4 9.5v5C4 15.879 5.121 17 6.5 17h7c1.379 0 2.5-1.121 2.5-2.5v-.566l1.814 1.304c.243.174.527.262.813.262.219 0 .438-.051.643-.156.45-.231.73-.683.73-1.18V9.837c0-.497-.28-.95-.73-1.18z",
        })
  );
};
Camera.displayName = "Camera";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$5 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __assign$b =
  (undefined && undefined.__assign) ||
  function () {
    __assign$b =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$b.apply(this, arguments);
  };
var __rest$4 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var dirTransform$1 = {
  up: "0",
  right: "90",
  down: "180",
  left: "270",
};
var StyledCaret = styled__default["default"](Svg)(
  templateObject_1$5 ||
    (templateObject_1$5 = __makeTemplateObject$5(
      ["\n  transform: ", ";\n"],
      ["\n  transform: ", ";\n"]
    )),
  function (_a) {
    var direction = _a.direction;
    return "rotate(" + dirTransform$1[direction || "up"] + "deg)";
  }
);
var Caret = function (_a) {
  var _b = _a.direction,
    direction = _b === void 0 ? "up" : _b,
    rest = __rest$4(_a, ["direction"]);
  return React__default["default"].createElement(
    StyledCaret,
    __assign$b({ direction: direction }, rest),
    React__default["default"].createElement("path", {
      "transform-origin": "center",
      d:
        "M8.824 13.88c-.21.18-.526.154-.705-.056-.159-.187-.156-.457-.006-.64l.063-.065 3.523-3c.165-.14.397-.156.577-.05l.074.052 3.477 3c.209.18.232.497.052.706-.16.185-.428.224-.632.104l-.074-.052-3.151-2.72-3.198 2.722z",
    })
  );
};
Caret.displayName = "Caret";
var templateObject_1$5;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$c =
  (undefined && undefined.__assign) ||
  function () {
    __assign$c =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$c.apply(this, arguments);
  };
var Caution = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$c({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 6c.68 0 1.294.338 1.643.905l5.085 8.281c.35.571.365 1.258.039 1.841-.335.6-.98.972-1.682.972H6.915c-.701 0-1.345-.372-1.68-.972-.326-.583-.312-1.27.039-1.841l5.085-8.281C10.707 6.338 11.32 6 12 6zm.79 1.429c-.33-.538-1.25-.536-1.58 0L6.125 15.71c-.16.261-.167.563-.017.829.16.288.463.46.807.46h10.17c.346 0 .648-.172.809-.46.149-.266.143-.568-.018-.829zm-.218 7.18v1.219h-1.166v-1.219h1.166zm.023-5.388v1.83l-.288 2.727h-.597l-.305-2.727V9.22h1.19z",
    })
  );
};
Caution.displayName = "Caution";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$d =
  (undefined && undefined.__assign) ||
  function () {
    __assign$d =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$d.apply(this, arguments);
  };
var Chat = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$d({}, props, { title: "Chat" }),
    React__default["default"].createElement("path", {
      d:
        "M8.497 6C7.12 6 6 7.12 6 8.497v9.413l1.022-.727c1.483-1.054 4.17-1.911 5.99-1.911h2.48c1.376 0 2.496-1.121 2.496-2.498V8.497C17.988 7.12 16.868 6 15.491 6H8.497zM5.905 19c-.14 0-.284-.034-.416-.102-.302-.156-.489-.464-.489-.804V8.497C5 6.569 6.568 5 8.497 5h6.994c1.93 0 3.497 1.569 3.497 3.497v4.277c0 1.929-1.568 3.498-3.497 3.498h-2.48c-1.616 0-4.093.791-5.409 1.727l-1.172.833c-.158.111-.34.168-.525.168z",
    })
  );
};
Chat.displayName = "Chat";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$e =
  (undefined && undefined.__assign) ||
  function () {
    __assign$e =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$e.apply(this, arguments);
  };
var Check = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$e({}, props),
    React__default["default"].createElement("path", {
      d:
        "M16.834 9.178c-.18-.21-.494-.238-.705-.061l-5.912 4.975-2.33-2.846c-.175-.214-.491-.245-.703-.07-.214.175-.246.49-.071.703l2.652 3.238.004.006c.037.044.085.073.132.1.015.01.026.025.04.032.068.03.138.046.21.046.056 0 .113-.01.166-.028.038-.013.07-.037.106-.06.015-.01.03-.014.045-.025v-.001l.006-.003 6.299-5.301c.21-.178.239-.493.06-.705",
    })
  );
};
Check.displayName = "Check";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$f =
  (undefined && undefined.__assign) ||
  function () {
    __assign$f =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$f.apply(this, arguments);
  };
var CheckRound = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$f({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.86 0-7 3.141-7 7s3.14 7 7 7 7-3.141 7-7-3.14-7-7-7zm3.493 4.873c.211-.179.526-.15.705.061.177.211.15.527-.061.705l-4.476 3.764-.003.002v.001c-.029.024-.061.035-.091.051-.02.011-.039.027-.061.035-.054.019-.11.028-.166.028-.072 0-.143-.015-.209-.045-.016-.007-.027-.023-.042-.032-.047-.028-.095-.056-.132-.1l-.001-.002-.003-.004-1.84-2.246c-.175-.213-.143-.529.07-.703.213-.177.529-.145.704.07l1.518 1.853z",
    })
  );
};
CheckRound.displayName = "CheckRound";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$g =
  (undefined && undefined.__assign) ||
  function () {
    __assign$g =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$g.apply(this, arguments);
  };
var Clear = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$g({}, props, { title: "Clear" }),
    React__default["default"].createElement("path", {
      d:
        "M12 5c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7zM9.172 9.17c-.196.196-.196.513 0 .708L11.293 12l-2.12 2.12c-.197.197-.197.513 0 .708.096.098.224.147.352.147.128 0 .256-.05.354-.147L12 12.707l2.121 2.12c.098.099.226.148.353.148.128 0 .256-.05.354-.147.195-.195.195-.511 0-.707L12.708 12l2.12-2.122c.195-.195.195-.512 0-.707-.195-.195-.512-.195-.707 0l-2.12 2.12-2.122-2.12c-.196-.195-.512-.195-.707 0z",
    })
  );
};
Clear.displayName = "Clear";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$h =
  (undefined && undefined.__assign) ||
  function () {
    __assign$h =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$h.apply(this, arguments);
  };
var Clock = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$h({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 2.559c.276 0 .5.223.5.5V11.5h3c.276 0 .5.224.5.5s-.224.5-.5.5H12c-.276 0-.5-.224-.5-.5V8.059c0-.277.224-.5.5-.5z",
    })
  );
};
Clock.displayName = "Clock";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$i =
  (undefined && undefined.__assign) ||
  function () {
    __assign$i =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$i.apply(this, arguments);
  };
var Cog = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$i({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12.616 4C13.379 4 14 4.62 14 5.384c0 .31.171.566.457.684.286.118.588.059.808-.16.539-.54 1.415-.54 1.956-.001l.872.873c.539.539.539 1.417 0 1.956-.22.219-.28.52-.161.807.118.286.374.457.684.457.763 0 1.384.62 1.384 1.384v1.233C20 13.38 19.379 14 18.616 14c-.309 0-.565.17-.684.458-.119.286-.059.588.161.807.539.54.539 1.417 0 1.956l-.872.873c-.541.539-1.417.539-1.956 0-.22-.22-.522-.28-.808-.161-.286.119-.457.374-.457.684C14 19.38 13.379 20 12.616 20h-1.233C10.62 20 10 19.38 10 18.617c0-.31-.171-.565-.457-.684-.292-.12-.589-.06-.808.16-.539.539-1.417.54-1.956 0l-.872-.872c-.261-.261-.405-.608-.406-.978 0-.37.145-.717.406-.98.219-.217.28-.52.16-.805-.119-.287-.375-.458-.684-.458C4.62 14 4 13.38 4 12.617v-1.233C4 10.62 4.62 10 5.383 10c.309 0 .566-.171.684-.457.119-.286.059-.588-.16-.807-.261-.261-.406-.61-.406-.978 0-.37.145-.717.406-.98l.872-.87c.537-.54 1.415-.541 1.956 0 .219.219.523.28.807.16.287-.118.458-.374.458-.684C10 4.62 10.62 4 11.383 4zm0 1h-1.233c-.211 0-.383.172-.383.384 0 .717-.412 1.334-1.075 1.608-.662.274-1.39.13-1.897-.377-.15-.15-.391-.15-.542 0l-.872.872c-.073.072-.113.169-.113.27 0 .103.04.199.113.272.507.507.652 1.234.377 1.897-.274.663-.89 1.074-1.608 1.074-.211 0-.383.172-.383.384v1.233c0 .21.172.383.383.383.718 0 1.334.412 1.608 1.075.275.663.13 1.39-.377 1.897-.073.073-.113.169-.113.27.001.104.04.199.113.27l.872.875c.152.15.393.149.542 0 .337-.338.772-.515 1.22-.515.226 0 .455.045.677.137.663.275 1.075.89 1.075 1.608 0 .21.172.383.383.383h1.233c.212 0 .384-.172.384-.383 0-.717.411-1.333 1.074-1.608.659-.272 1.389-.13 1.898.378.149.149.394.149.542-.001l.872-.872c.149-.15.149-.393 0-.542-.508-.507-.653-1.234-.378-1.897.274-.663.89-1.075 1.608-1.075.212 0 .384-.172.384-.383v-1.233c0-.212-.172-.384-.384-.384-.718 0-1.334-.412-1.608-1.075-.275-.662-.13-1.39.378-1.896.149-.15.149-.393 0-.542l-.872-.872c-.15-.15-.393-.15-.542 0-.509.508-1.239.65-1.898.377C13.412 6.717 13 6.1 13 5.384c0-.212-.172-.384-.384-.384zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm0 1c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z",
    })
  );
};
Cog.displayName = "Cog";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$j =
  (undefined && undefined.__assign) ||
  function () {
    __assign$j =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$j.apply(this, arguments);
  };
var ConnectionProblem = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$j({}, props),
    React__default["default"].createElement("path", {
      d:
        "M6.113 13.03h3.5c.496 0 .898.403.898.898v4.91l6.398-7.808h-3.5c-.495 0-.898-.402-.898-.897V5.19l-6.398 7.84zm4.295 6.995c-.108 0-.215-.02-.32-.06-.35-.133-.577-.462-.577-.837V14.03H5.9c-.358 0-.673-.204-.82-.532-.147-.327-.09-.698.149-.966l6.7-8.213c.265-.296.65-.395 1.004-.258.35.133.577.462.577.837v5.132h3.604c.36 0 .676.205.823.533.148.328.09.7-.148.969l-6.7 8.176c-.184.208-.43.317-.682.317z",
    })
  );
};
ConnectionProblem.displayName = "ConnectionProblem";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$k =
  (undefined && undefined.__assign) ||
  function () {
    __assign$k =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$k.apply(this, arguments);
  };
var ScreenShare = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$k({}, props, { title: "Screen share" }),
    React__default["default"].createElement("path", {
      d:
        "M15.5 17c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zM18 6c1.103 0 2 .897 2 2v6c0 1.103-.897 2-2 2H6c-1.103 0-2-.897-2-2V8c0-1.103.897-2 2-2zm0 1H6c-.552 0-1 .449-1 1v6c0 .551.448 1 1 1h12c.552 0 1-.449 1-1V8c0-.551-.448-1-1-1z",
    })
  );
};
ScreenShare.displayName = "ScreenShare";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$l =
  (undefined && undefined.__assign) ||
  function () {
    __assign$l =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$l.apply(this, arguments);
  };
var Crown = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$l({}, props),
    React__default["default"].createElement("path", {
      d:
        "M16.116 16h-8.23l-1.674-4.994 1.973 1.607c.355.289.815.388 1.257.274.444-.116.795-.427.965-.853L12 8.019l1.593 4.015c.17.426.521.737.964.853.444.114.903.015 1.257-.274l1.972-1.606L16.116 16zm.39 2h-9.01C7.22 18 7 17.778 7 17.495c0-.273.221-.495.495-.495h9.011c.272 0 .494.222.494.505 0 .273-.222.495-.495.495zM19 8.105c-.552 0-1 .457-1 1.018 0 .184.061.347.145.496-.164.01-.324.07-.458.179l-2.504 2.039c-.106.087-.242.116-.374.082-.13-.035-.237-.127-.287-.254l-1.776-4.477c-.052-.132-.144-.23-.25-.306.295-.176.504-.49.504-.864C13 5.457 12.552 5 12 5s-1 .457-1 1.018c0 .374.21.688.505.864-.108.076-.2.173-.25.305l-1.778 4.478c-.049.127-.155.219-.287.254-.13.034-.266.005-.374-.082L6.312 9.798c-.133-.109-.294-.169-.458-.179.084-.149.146-.312.146-.496 0-.561-.448-1.018-1-1.018s-1 .457-1 1.018c0 .561.448 1.017 1 1.017.02 0 .035-.01.054-.011-.056.151-.066.324-.02.506l1.845 5.502c-.517.236-.879.757-.879 1.368C6 18.329 6.671 19 7.495 19h9.01C17.33 19 18 18.329 18 17.495c0-.603-.362-1.121-.877-1.357l1.853-5.541c.04-.161.028-.322-.028-.468.02.001.033.011.052.011.552 0 1-.456 1-1.017 0-.561-.448-1.018-1-1.018z",
    })
  );
};
Crown.displayName = "Crown";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$m =
  (undefined && undefined.__assign) ||
  function () {
    __assign$m =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$m.apply(this, arguments);
  };
var __rest$5 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var DeskPhone = function (_a) {
  var _b = _a.disabled,
    disabled = _b === void 0 ? false : _b,
    _c = _a.poorConnection,
    poorConnection = _c === void 0 ? false : _c,
    rest = __rest$5(_a, ["disabled", "poorConnection"]);
  return React__default["default"].createElement(
    Svg,
    __assign$m({}, rest),
    poorConnection
      ? disabled
        ? React__default["default"].createElement("path", {
            d:
              "M4.146 4.147c.196-.196.512-.196.707 0l15 15c.196.195.196.511 0 .707-.097.097-.225.146-.353.146-.128 0-.256-.049-.354-.146l-.938-.939c-.13.051-.266.085-.413.085h-.125v-.623L16.293 17H16v-.294l-1.628-1.628H14v-.372L12.293 13H12v-.294l-1-1v4.138C11 16.482 10.48 17 9.843 17H8.156C7.52 17 7 16.482 7 15.844V7.706L6.293 7h-.058c-.08 0-.138.06-.152.12l-.973-.235c.065-.266.218-.488.422-.645L4.146 4.854c-.195-.196-.195-.512 0-.707zm1.858 13.734c.014.06.071.12.152.12h.125v1h-.125c-.537 0-.999-.365-1.125-.886zM8.263 18v1h-1v-1h1zm2.106 0v1h-1v-1h1zm2.107 0v1h-1v-1h1zm2.106 0v1h-1v-1h1zm2.107 0v1h-1v-1h1zm-3.69-2v1h-1v-1h1zM15 16v1h-1.001v-1H15zm-9 0v1H5v-1h1zm13 0v.907L18.093 16H19zM8 8.706v7.138c0 .086.07.156.156.156h1.687c.086 0 .156-.07.156-.156v-5.138l-2-2zm4.999 5.372v1.001h-1v-1.001h1zM19 14v1h-1v-1h1zM6 14v1H5v-1h1zm11 .078v.828l-.829-.828H17zM17 12v1.001h-1V12h1zm2 0v1h-1v-1h1zM6 12v1H5v-1h1zm9 0v.906L14.092 12H15zM9.843 5C10.48 5 11 5.52 11 6.156V8h5.172c.457 0 .828.372.828.83v1.341c0 .457-.371.83-.828.83h-3.078l-1-1H16V9h-4.906L10 7.905v-1.75C10 6.07 9.929 6 9.844 6H8.157c-.018 0-.03.014-.045.02l-.717-.718C7.599 5.12 7.862 5 8.157 5zM19 10v1h-1v-1h1zM6 10v1H5v-1h1zm13-2v1h-1V8h1zM6 8v1H5V8h1zm11.876-2c.537 0 .999.364 1.125.885l-.973.234c-.014-.06-.071-.119-.152-.119h-.125V6zm-5.321 0v1h-1V6h1zm2.106 0v1h-1V6h1zm2.108 0v1h-1V6h1z",
          })
        : React__default["default"].createElement("path", {
            d:
              "M6.003 17.882c.012.047.05.095.107.112l.045.007h.125v1h-.125c-.495 0-.927-.311-1.09-.768l-.035-.117.973-.234zM8.262 18v1h-1v-1h1zm2.107 0v1h-1v-1h1zm2.107 0v1h-1v-1h1zm2.107 0v1h-1v-1h1zm2.106 0v1h-1v-1h1zm1.259-.118l.973.234c-.117.48-.52.828-1.003.879l-.122.006h-.125v-1h.125c.08 0 .139-.061.152-.119zM9.843 5c.595 0 1.087.453 1.15 1.032l.007.125v1.844h5.172c.422 0 .77.316.822.725l.006.103v1.342c0 .422-.316.772-.724.823l-.104.007H11v4.843c0 .595-.452 1.087-1.031 1.15L9.843 17H8.156c-.595 0-1.086-.452-1.15-1.03L7 15.842V6.159c0-.596.451-1.088 1.03-1.15L8.156 5h1.687zM6 16v1H5v-1h1zm13 0v1h-1v-1h1zm-6.001 0v1h-1v-1h1zM15 16v1h-1v-1h1zm2 0v1h-1v-1h1zM9.843 6H8.156c-.069 0-.127.045-.148.108L8 6.158v9.685c0 .07.045.129.107.15l.049.007h1.687c.069 0 .128-.045.149-.107l.008-.05V6.159C10 6.07 9.929 6 9.843 6zm3.156 8.079v1h-1v-1h1zm2.001 0v1h-1v-1h1zm2 0v1h-1v-1h1zM6 14v1H5v-1h1zm13 0v1h-1v-1h1zM6 12.003v1H5v-1h1zm13 0v1h-1v-1h1zM12.999 12v1h-1v-1h1zM15 12v1h-1v-1h1zm2 0v1h-1v-1h1zM6 10.003v1H5v-1h1zm13 0v1h-1v-1h1zM16 9h-5v1h5V9zm3-1v1h-1V8h1zM6 8v1H5V8h1zm.361-2v1h-.125c-.065 0-.115.039-.139.084l-.013.036-.973-.234c.116-.481.519-.828 1.003-.879l.122-.006h.125zm11.514.001c.496 0 .927.31 1.09.768l.035.117-.973.234c-.011-.049-.05-.096-.106-.112L17.875 7h-.125v-1h.125zm-5.32 0v1h-1V6h1zm2.107 0v1h-1V6h1zm2.106 0v1h-1V6h1z",
          })
      : disabled
      ? React__default["default"].createElement("path", {
          d:
            "M4.146 4.146c.196-.195.512-.195.707 0l15 15c.196.196.196.512 0 .708-.097.097-.225.146-.353.146-.128 0-.256-.049-.354-.146l-.923-.923c-.119.042-.245.069-.379.069H6.156C5.518 19 5 18.481 5 17.844V7.156c0-.394.211-.726.513-.935L4.146 4.854c-.195-.196-.195-.512 0-.708zM6.293 7h-.137C6.07 7 6 7.07 6 7.156v10.688c0 .086.07.156.156.156h11.137l-1-1H16v-.293l-1.629-1.629h-.37v-.371L12.292 13H12v-.293l-1-1v4.137C11 16.481 10.481 17 9.844 17H8.156C7.518 17 7 16.481 7 15.844V7.707L6.293 7zM13 16v1h-1v-1h1zm2 0v1h-1v-1h1zM9.843 5c.542 0 .979.379 1.103.882L10.97 6h6.875c.595 0 1.086.452 1.15 1.03l.006.126v9.76l-1-1v-8.76c0-.069-.045-.127-.107-.148L17.844 7H11v1h5.171c.422 0 .771.317.823.725L17 8.83v1.342c0 .422-.317.771-.725.823l-.104.006h-3.087l-1-1H16V9h-4.916L10 7.916v-1.76c0-.069-.045-.127-.107-.148L9.843 6H8.156l-.026.008-.025.013-.716-.716c.171-.153.384-.263.621-.295L8.156 5h1.687zM8 8.707v7.137c0 .086.07.156.156.156h1.688c.085 0 .156-.07.156-.156v-5.137l-2-2zm5 5.371v1h-1v-1h1zm4 0v.837l-.838-.837H17zM17 12v1h-1v-1h1zm-2 0v.916L14.084 12H15z",
        })
      : React__default["default"].createElement("path", {
          d:
            "M9.844 5c.582 0 1.045.44 1.125 1h6.875C18.481 6 19 6.519 19 7.157v10.687c0 .638-.519 1.156-1.156 1.156H6.156C5.519 19 5 18.482 5 17.844V7.157C5 6.519 5.519 6 6.156 6h.875c.08-.56.543-1 1.125-1zM7 7h-.844C6.07 7 6 7.07 6 7.157v10.687c0 .086.07.156.156.156h11.688c.086 0 .156-.07.156-.156V7.157C18 7.07 17.93 7 17.844 7H11v1h5.171c.457 0 .829.372.829.829v1.343c0 .457-.372.828-.829.828H11v4.844C11 16.482 10.481 17 9.844 17H8.156C7.519 17 7 16.482 7 15.844V7zm6 9v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zM9.844 6H8.156C8.07 6 8 6.07 8 6.157v9.687c0 .086.07.156.156.156h1.688c.086 0 .156-.07.156-.156V6.157C10 6.07 9.93 6 9.844 6zM13 14.078v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zM13 12v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm-1-3h-5v1h5V9z",
        })
  );
};
DeskPhone.displayName = "DeskPhone";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$n =
  (undefined && undefined.__assign) ||
  function () {
    __assign$n =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$n.apply(this, arguments);
  };
var Dialer = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$n({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 15.972c1.11 0 2.014.904 2.014 2.015C14.014 19.097 13.11 20 12 20c-1.11 0-2.014-.903-2.014-2.013 0-1.111.904-2.015 2.014-2.015zm0 1.036c-.54 0-.977.44-.977.979 0 .54.438.977.977.977.54 0 .977-.438.977-.977 0-.54-.438-.979-.977-.979zm-4.986-6.022c1.11 0 2.014.904 2.014 2.014 0 1.11-.904 2.014-2.014 2.014C5.904 15.014 5 14.11 5 13c0-1.11.904-2.014 2.014-2.014zm4.986 0c1.11 0 2.014.904 2.014 2.014 0 1.11-.904 2.014-2.014 2.014-1.11 0-2.014-.904-2.014-2.014 0-1.11.904-2.014 2.014-2.014zm4.986 0c1.11 0 2.014.904 2.014 2.014 0 1.11-.904 2.014-2.014 2.014-1.11 0-2.014-.904-2.014-2.014 0-1.11.904-2.014 2.014-2.014zm-9.972 1.036c-.54 0-.977.439-.977.978 0 .54.438.978.977.978.54 0 .977-.438.977-.978 0-.539-.437-.978-.977-.978zm4.986 0c-.54 0-.977.439-.977.978 0 .54.438.978.977.978.54 0 .977-.438.977-.978 0-.539-.438-.978-.977-.978zm4.986 0c-.54 0-.977.439-.977.978 0 .54.437.978.977.978s.977-.438.977-.978c0-.539-.438-.978-.977-.978zM7.014 6c1.11 0 2.014.903 2.014 2.014 0 1.11-.904 2.014-2.014 2.014C5.904 10.028 5 9.124 5 8.014 5 6.904 5.904 6 7.014 6zM12 6c1.11 0 2.014.903 2.014 2.014 0 1.11-.904 2.014-2.014 2.014-1.11 0-2.014-.904-2.014-2.014C9.986 6.904 10.89 6 12 6zm4.986 0C18.096 6 19 6.904 19 8.013c0 1.111-.904 2.015-2.014 2.015-1.11 0-2.014-.904-2.014-2.015 0-1.11.904-2.013 2.014-2.013zM7.014 7.036c-.54 0-.977.439-.977.978 0 .54.438.978.977.978.54 0 .977-.438.977-.978s-.437-.978-.977-.978zm4.986 0c-.54 0-.977.439-.977.978 0 .54.438.978.977.978.54 0 .977-.438.977-.978s-.438-.978-.977-.978zm4.986 0c-.54 0-.977.438-.977.977 0 .54.437.979.977.979s.977-.439.977-.979c0-.539-.438-.977-.977-.977z",
    })
  );
};
Dialer.displayName = "Dialer";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$o =
  (undefined && undefined.__assign) ||
  function () {
    __assign$o =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$o.apply(this, arguments);
  };
var Dislike = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$o({}, props),
    React__default["default"].createElement("path", {
      d:
        "M18.977 11.946l-1.29-4.575C17.528 6.577 16.818 6 16 6H9.126c-.197 0-.357.158-.357.352V12.614l3.034 5.353c.123.044.45.069.76-.105.479-.271.732-.897.733-1.842l.089-1.43c.02-.45.389-.803.84-.803h3.194c.479 0 .926-.211 1.228-.58.298-.364.415-.837.33-1.261M7.337 6h-1.99C5.156 6 5 6.156 5 6.347v5.552c0 .191.156.347.347.347h2.037c.212 0 .385-.173.385-.385V6.43c0-.237-.193-.43-.431-.43m12.082 7.84c-.492.602-1.22.947-2.001.947h-3.044l-.08 1.264c0 2.228-1.244 2.765-1.778 2.893-.577.137-1.321.028-1.55-.423l-3.05-5.383c-.164.069-.344.108-.533.108H5.347c-.742 0-1.347-.605-1.347-1.347V6.347C4 5.605 4.605 5 5.347 5h1.99c.347 0 .66.128.908.333.238-.204.544-.333.88-.333H16c1.29 0 2.413.914 2.66 2.136l1.289 4.575c.153.756-.04 1.531-.53 2.129",
    })
  );
};
Dislike.displayName = "Dislike";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$p =
  (undefined && undefined.__assign) ||
  function () {
    __assign$p =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$p.apply(this, arguments);
  };
var DropToAttach = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$p({}, props, { viewBox: "0 0 130 130" }),
    React__default["default"].createElement("path", {
      fill: "#FFF",
      d:
        "M65.43 29.094L65.903 39.871 74.377 40.564 60.598 57.243 60.04 46.147 51.452 45.361 64.931 28.57z",
      transform:
        "translate(-375 -646) translate(295.5 362) translate(80 284) translate(6.5)",
    }),
    React__default["default"].createElement("path", {
      fill: "#075FFF",
      d:
        "M64.961 29.412L52.258 44.977l7.018.038c.828 0 1.502.673 1.502 1.501v9.852l12.706-15.537h-7.02c-.829 0-1.503-.673-1.503-1.502v-9.917zM60.78 57.87c-.178 0-.359-.032-.534-.1-.587-.222-.967-.773-.967-1.402v-9.852h-7.034c-.602 0-1.129-.342-1.375-.89-.247-.55-.152-1.17.248-1.62l12.701-15.567c.438-.494 1.09-.652 1.676-.43.587.223.967.774.967 1.403v9.917l7.023.002c.604 0 1.132.342 1.38.893.247.551.152 1.173-.249 1.625L61.92 57.343c-.307.345-.718.527-1.14.527z",
      transform:
        "translate(-375 -646) translate(295.5 362) translate(80 284) translate(6.5)",
    }),
    React__default["default"].createElement("path", {
      fill: "#FFF",
      d:
        "M91.059 29.729L92.616 26.084 97.976 31.805 91.896 33.737 91.517 31.805z",
      transform:
        "translate(-375 -646) translate(295.5 362) translate(80 284) translate(6.5)",
    }),
    React__default["default"].createElement("path", {
      fill: "#075FFF",
      d:
        "M90.539 18.583c1.533-.23 3.08-.148 4.596.242 6.188 1.593 9.927 7.924 8.334 14.113-1.042 4.051-4.203 7.236-8.25 8.313-.938.251-1.907.382-2.88.389-.417 0-.753-.332-.756-.745-.003-.414.33-.752.745-.755.846-.006 1.689-.12 2.506-.338 3.523-.938 6.275-3.712 7.182-7.238.672-2.61.287-5.325-1.083-7.646-1.37-2.321-3.562-3.968-6.172-4.64-1.32-.34-2.666-.41-4.001-.212-.408.065-.791-.221-.852-.631-.061-.409.22-.791.63-.852zm1.831 6.982c.65-.152 1.331.07 1.768.58l3.464 4.047c.38.443.52 1.046.374 1.613-.145.567-.559 1.027-1.107 1.233l-3.982 1.493c-.086.032-.176.048-.263.048-.304 0-.589-.186-.702-.487-.146-.388.05-.82.44-.966l3.981-1.493c.124-.047.167-.146.181-.202.014-.055.025-.163-.06-.263l-3.466-4.046c-.1-.118-.223-.11-.289-.095-.065.015-.179.062-.217.213l-.603 2.34c-.104.402-.512.644-.914.54-.4-.103-.642-.512-.539-.913l.602-2.341c.168-.65.678-1.15 1.332-1.301z",
      transform:
        "translate(-375 -646) translate(295.5 362) translate(80 284) translate(6.5)",
    }),
    React__default["default"].createElement("path", {
      d:
        "M70.507 8.38c2.633 0 5.125 1.146 6.838 3.144l8.47 9.883c1.399 1.631 2.169 3.712 2.169 5.861v32.995c0 3.977-3.235 7.211-7.211 7.211H44.96c-3.976 0-7.211-3.234-7.211-7.211V15.591c0-3.976 3.235-7.211 7.21-7.211zm0 1.5H44.96c-3.15 0-5.711 2.562-5.711 5.711v44.672c0 3.149 2.562 5.711 5.71 5.711h35.813c3.149 0 5.71-2.562 5.71-5.711V27.268c0-.242-.013-.483-.036-.722h-10.06c-3.177 0-5.763-2.586-5.763-5.764V9.886c-.04 0-.078-.006-.117-.006zm-45.95-5.234c1.732-.217 3.492.19 4.954 1.187l5.185 3.906c.33.249.397.719.148 1.05-.25.33-.72.396-1.05.148l-5.157-3.885c-.955-.65-2.092-.978-3.246-.964l2.134 7.89c.456 1.688 2.2 2.69 3.888 2.233.397-.11.81.128.92.529.108.4-.13.81-.53.92-.405.11-.814.162-1.217.162-2.057 0-3.947-1.372-4.51-3.452l-2.182-8.071-19.212 5.194c-1.11.3-2.035 1.014-2.608 2.01-.572.997-.722 2.157-.422 3.266l9.117 33.719c.618 2.29 2.987 3.647 5.275 3.03l17.509-4.28c.403-.098.81.148.907.55.099.402-.148.809-.55.907L16.418 54.97c-.5.135-1.003.199-1.5.199-2.548 0-4.9-1.705-5.597-4.29L.204 17.16c-.404-1.495-.202-3.06.57-4.403.77-1.344 2.02-2.307 3.516-2.712l19.283-5.213c.173-.047.348-.078.522-.111.044-.022.083-.053.132-.066.112-.031.223-.03.33-.01zm55.34-.158c.822-3.19 4.085-5.12 7.28-4.298l20.016 5.152c2.103.541 3.858 1.97 4.816 3.92l4.644 9.452c.782 1.59.97 3.412.527 5.128l-6.656 25.854c-.398 1.546-1.374 2.845-2.749 3.658-.932.55-1.973.833-3.029.833-.5 0-1.003-.064-1.5-.192l-11.73-3.22c-.4-.103-.642-.513-.54-.914.105-.4.512-.64.915-.539l11.73 3.22c1.156.297 2.362.128 3.392-.48 1.03-.609 1.761-1.58 2.06-2.74l6.655-25.854c.037-.144.045-.29.071-.437l-7.734-1.99c-1.244-.32-2.288-1.106-2.94-2.21-.654-1.107-.837-2.4-.517-3.644l2.164-8.404-19.97-5.14c-2.39-.617-4.837.828-5.452 3.22l-.966 3.81c-.103.4-.512.643-.913.539-.4-.103-.642-.512-.539-.914zm-7.773 5.567v10.727c0 2.351 1.913 4.264 4.264 4.264h9.752c-.301-.971-.792-1.88-1.463-2.662l-8.471-9.883c-1.07-1.249-2.506-2.099-4.082-2.446zm36.054-2.717l-2.117 8.223c-.22.856-.094 1.745.355 2.506.45.76 1.167 1.3 2.023 1.521l7.446 1.917c-.06-.735-.248-1.459-.578-2.13l-4.644-9.452c-.546-1.11-1.42-2.004-2.485-2.585z",
      transform:
        "translate(-375 -646) translate(295.5 362) translate(80 284) translate(6.5)",
    }),
    React__default["default"].createElement("path", {
      fill: "#FFF",
      d:
        "M24.191 24.91L27.535 37.359 26.365 37.927 21.12 36.082 17.066 36.891 15.453 30.572 19.261 29.247 22.98 24.91z",
      transform:
        "translate(-375 -646) translate(295.5 362) translate(80 284) translate(6.5)",
    }),
    React__default["default"].createElement("path", {
      fill: "#075FFF",
      d:
        "M21.934 24.52c.467-.598 1.216-.876 1.967-.73.724.144 1.292.667 1.48 1.365l3.05 11.279c.189.698-.038 1.436-.592 1.924-.376.332-.846.505-1.324.505-.255 0-.513-.05-.76-.151l-4.436-1.586c-.161-.058-.342-.064-.51-.02l-2.833.768c-1.025.276-2.081-.314-2.353-1.317l-1.364-5.045c-.272-1.008.345-2.056 1.376-2.335l2.826-.764c.167-.045.319-.141.428-.271zm1.676.742c-.072-.014-.323-.043-.497.184l-.021.027-3.055 3.634c-.308.367-.718.627-1.185.754l-2.825.764c-.233.063-.377.285-.32.496l1.364 5.044c.056.205.284.32.514.26l2.833-.766c.204-.055.412-.083.619-.083.267 0 .533.046.787.137l4.469 1.6c.298.123.5-.03.554-.08.074-.065.19-.206.136-.408l-3.05-11.28c-.054-.201-.226-.263-.323-.283zm5.45 1.149c.178-.374.627-.531 1-.352 1.302.624 2.261 1.768 2.632 3.137.37 1.37.117 2.84-.692 4.036-.145.214-.382.33-.622.33-.145 0-.29-.042-.42-.13-.343-.232-.433-.698-.2-1.041.564-.834.742-1.856.486-2.803-.257-.948-.925-1.741-1.833-2.177-.373-.18-.53-.627-.352-1z",
      transform:
        "translate(-375 -646) translate(295.5 362) translate(80 284) translate(6.5)",
    }),
    React__default["default"].createElement(
      "g",
      null,
      React__default["default"].createElement(
        "text",
        { transform: "translate(0 84)" },
        React__default["default"].createElement(
          "tspan",
          { x: ".14", y: "14" },
          "Drop to attach file"
        )
      )
    )
  );
};
DropToAttach.displayName = "DropToAttach";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$q =
  (undefined && undefined.__assign) ||
  function () {
    __assign$q =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$q.apply(this, arguments);
  };
var Dots = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$q({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 1c-3.86 0-7 3.14-7 7 0 3.859 3.14 7 7 7 3.859 0 7-3.141 7-7 0-3.86-3.141-7-7-7zm-3 6c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm6 0c.553 0 1 .448 1 1s-.447 1-1 1c-.553 0-1-.448-1-1s.447-1 1-1zm-3 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z",
    })
  );
};
Dots.displayName = "Dots";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$r =
  (undefined && undefined.__assign) ||
  function () {
    __assign$r =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$r.apply(this, arguments);
  };
var __rest$6 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Dock = function (_a) {
  var undock = _a.undock,
    rest = __rest$6(_a, ["undock"]);
  return React__default["default"].createElement(
    Svg,
    __assign$r({}, rest),
    undock
      ? React__default["default"].createElement("path", {
          d:
            "M11.434 5c.276 0 .5.223.5.5 0 .276-.224.5-.5.5H8.967C7.331 6 6 7.331 6 8.966v6.067C6 16.67 7.331 18 8.967 18h6.066C16.669 18 18 16.67 18 15.033v-2.467c0-.276.224-.5.5-.5s.5.224.5.5v2.467C19 17.22 17.221 19 15.033 19H8.967C6.779 19 5 17.22 5 15.033V8.966C5 6.78 6.779 5 8.967 5zM18.5 5c.066 0 .13.014.19.038.124.05.22.149.272.27.024.063.038.127.038.192v4c0 .277-.224.5-.5.5s-.5-.223-.5-.5V6.707l-6.121 6.122c-.098.097-.226.146-.354.146-.127 0-.255-.05-.353-.146-.195-.196-.195-.512 0-.708L17.292 6H14.5c-.276 0-.5-.223-.5-.5 0-.276.224-.5.5-.5z",
        })
      : React__default["default"].createElement("path", {
          d:
            "M11.434 5c.276 0 .5.223.5.5 0 .276-.224.5-.5.5H8.967C7.331 6 6 7.331 6 8.966v6.067C6 16.67 7.331 18 8.967 18h6.066C16.669 18 18 16.67 18 15.033v-2.467c0-.276.224-.5.5-.5s.5.224.5.5v2.467C19 17.22 17.221 19 15.033 19H8.967C6.779 19 5 17.22 5 15.033V8.966C5 6.78 6.779 5 8.967 5zm6.067 1c.127 0 .255.049.353.146.195.196.195.512 0 .708l-6.121 6.12h2.793c.276 0 .5.224.5.5 0 .277-.224.5-.5.5h-4c-.066 0-.13-.013-.191-.037-.123-.051-.22-.15-.271-.271-.024-.062-.038-.126-.038-.191v-4c0-.277.224-.5.5-.5s.5.223.5.5v2.793l6.12-6.122c.099-.097.227-.146.355-.146z",
        })
  );
};
Dock.displayName = "Dock";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$s =
  (undefined && undefined.__assign) ||
  function () {
    __assign$s =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$s.apply(this, arguments);
  };
var Document = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$s({}, props),
    React__default["default"].createElement("path", {
      d:
        "M16.042 18H7.959C7.43 18 7 17.57 7 17.042V6.959C7 6.431 7.43 6 7.959 6h5.461v2.131c0 .899.732 1.632 1.632 1.632H17v7.279c0 .528-.43.958-.958.958zm.63-9.293c.014.017.019.038.033.056h-1.653c-.348 0-.632-.284-.632-.632V6.2c.125.074.243.163.34.277l1.912 2.23zm.759-.65L15.52 5.826C15.069 5.301 14.416 5 13.725 5H7.959C6.878 5 6 5.879 6 6.959v10.083C6 18.122 6.878 19 7.959 19h8.083c1.08 0 1.958-.878 1.958-1.958V9.595c0-.564-.202-1.11-.569-1.538z",
    })
  );
};
Document.displayName = "Document";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$t =
  (undefined && undefined.__assign) ||
  function () {
    __assign$t =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$t.apply(this, arguments);
  };
var __rest$7 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Echo = function (_a) {
  var _b = _a.muted,
    muted = _b === void 0 ? false : _b,
    _c = _a.poorConnection,
    poorConnection = _c === void 0 ? false : _c,
    rest = __rest$7(_a, ["muted", "poorConnection"]);
  return React__default["default"].createElement(
    Svg,
    __assign$t({}, rest),
    poorConnection
      ? muted
        ? React__default["default"].createElement("path", {
            d:
              "M12.463 18.992l.037 1c-.145.005-.29.008-.438.008-.19-.003-.361-.003-.54-.008l.033-1c.165.006.335.007.505.008.138 0 .271-.003.402-.008zM4.146 4.146c.194-.195.511-.195.707 0l2.228 2.229c-.005-.013-.014-.024-.02-.037l.913.912c-.016-.008-.03-.019-.045-.027l1.447 1.446.026.01 1.23 1.229-.021-.003 5.387 5.388v-.018l.298.297h.014l.537.538-.015.015 3.02 3.021c.195.195.195.512 0 .707-.098.098-.226.147-.354.147-.127 0-.255-.049-.352-.146L17 17.707v.11h-1v-.943h.169l-.09-.088c-.966.532-2.556.786-4.08.786-2.171 0-4.489-.512-4.92-1.622h-.08v-.943h1v.565c0 .256 1.375 1 4 1 1.57 0 2.682-.267 3.332-.535l-6.47-6.47C8 9.313 7.337 8.93 7.101 8.41H7v-.702L4.146 4.854c-.195-.196-.195-.513 0-.708zm5.616 14.647c.278.055.575.101.89.135l-.11.994c-.345-.038-.672-.087-.977-.149zm4.49-.005l.2.98c-.305.063-.632.114-.978.152l-.109-.994c.312-.034.61-.081.886-.138zm-6.05-.568c.17.123.417.243.716.346l-.328.945c-.396-.137-.724-.299-.974-.48zm7.604-.006l.596.803c-.246.184-.575.348-.974.488l-.332-.944c.3-.105.546-.226.71-.348zM8 16.895v.942H7v-.942h1zm0-3.772v.943H7v-.943h1zm9-.019v.943h-.813L16 13.86v-.756h1zm-9-1.866v.943H7v-.943h1zm9-.019v.942h-1v-.942h1zM8 9.352v.943H7v-.943h1zm9-.018v.942h-1v-.942h1zm0-1.886v.942h-.091c-.46 1.066-2.68 1.567-4.796 1.583l-1.03-1.03c.286.021.592.032.917.032 2.625 0 4-.743 4-1v-.527h1zM12 4c2.408 0 5 .626 5 2l-.001.005H17v.5h-.132C16.315 7.527 14.09 8 12 8c-.678 0-1.369-.052-2.014-.153L8.563 6.424C9.194 6.706 10.349 7 12 7c2.625 0 4-.743 4-1s-1.375-1-4-1c-2.372 0-3.712.604-3.95.91l-.702-.702C8.128 4.385 10.117 4 12 4zM9.892 5.648c.514 0 .931.142.931.318 0 .176-.417.317-.93.317-.515 0-.932-.141-.932-.317 0-.176.417-.318.931-.318zm4.328 0c.515 0 .932.142.932.318 0 .176-.417.317-.932.317-.513 0-.93-.141-.93-.317 0-.176.417-.318.93-.318z",
          })
        : React__default["default"].createElement("path", {
            d:
              "M12.46 18.992l.038 1c-.144.005-.29.008-.436.008-.181-.003-.362-.003-.54-.008l.03-1c.167.006.335.007.508.008.136 0 .27-.003.4-.008zm-2.697-.2c.277.056.573.102.887.136l-.109.994c-.345-.038-.673-.088-.979-.15zm4.488-.004l.201.98c-.305.063-.632.114-.978.152l-.109-.994c.312-.034.61-.081.886-.138zm-6.046-.568c.168.122.414.242.714.345l-.328.945c-.397-.137-.725-.299-.974-.48zm7.603-.008l.592.806c-.248.183-.576.346-.973.485l-.332-.942c.3-.105.546-.227.713-.35zM8 16.893v.942H7v-.942h1zm9-.017v.942h-1v-.942h1zm0-1.886v.942h-.071c-.415 1.121-2.744 1.64-4.929 1.64-2.173 0-4.489-.513-4.922-1.622H7v-.943h1v.564c0 .257 1.375 1 4 1s4-.743 4-1v-.58h1zm-9-1.869v.943H7v-.943h1zm9-.016v.942h-1v-.942h1zm-9-1.87v.943H7v-.943h1zm9-.016v.942h-1v-.942h1zM8 9.351v.943H7v-.943h1zm9-.017v.942h-1v-.942h1zm0-1.885v.942h-.092C16.44 9.475 14.149 9.976 12 9.976c-2.139 0-4.417-.495-4.901-1.567H7v-.944h1v.51c0 .258 1.375 1 4 1s4-.742 4-1V7.45h1zM12 4c2.408 0 5 .626 5 2l-.001.005H17v.5h-.132C16.315 7.527 14.09 8 12 8c-2.09 0-4.315-.473-4.868-1.495H7v-.5V6c0-1.374 2.592-2 5-2zm0 1c-2.625 0-4 .743-4 1s1.375 1 4 1 4-.743 4-1-1.375-1-4-1zm-2.107.647c.515 0 .932.143.932.318 0 .176-.417.319-.932.319-.515 0-.932-.143-.932-.319 0-.175.417-.317.932-.317zm4.329 0c.514 0 .93.143.93.318 0 .176-.416.319-.93.319-.515 0-.932-.143-.932-.319 0-.175.417-.317.932-.317z",
          })
      : muted
      ? React__default["default"].createElement("path", {
          d:
            "M4.146 4.146c.196-.195.512-.195.708 0l15 15c.195.196.195.512 0 .708-.098.097-.226.146-.354.146-.128 0-.256-.049-.354-.146L17 17.707V18c0 1.374-2.592 2-5 2s-5-.626-5-2V7.707L4.146 4.854c-.195-.196-.195-.512 0-.708zM16 16.825c-.972.505-2.516.747-4 .747-1.479 0-3.025-.237-4-.738V18c0 .257 1.375 1 4 1s4-.743 4-1zM8 9.232v6.34c0 .257 1.375 1 4 1 1.569 0 2.682-.265 3.331-.534L8.86 9.567c-.317-.094-.608-.205-.86-.335zM12 4c2.409 0 5 .626 5 2v8.909l-1-1V9.237c-.96.494-2.474.73-3.934.738L11.03 8.939c.302.022.624.037.97.037 2.625 0 4-.743 4-1v-.714c-.974.5-2.52.738-4 .738-.698 0-1.41-.054-2.072-.163L8.463 6.372C9.063 6.669 10.246 7 12 7c2.625 0 4-.743 4-1s-1.375-1-4-1c-2.46 0-3.806.649-3.967.942L7.62 5.53l-.297-.296C8.088 4.393 10.099 4 12 4zM9.892 5.648c.515 0 .931.142.931.318 0 .176-.416.317-.93.317-.515 0-.932-.141-.932-.317 0-.176.417-.318.931-.318zm4.33 0c.513 0 .93.142.93.318 0 .176-.417.317-.93.317-.515 0-.932-.141-.932-.317 0-.176.417-.318.931-.318z",
        })
      : React__default["default"].createElement("path", {
          d:
            "M12 4c2.408 0 5 .626 5 2v12c0 1.374-2.592 2-5 2s-5-.626-5-2V6c0-1.374 2.592-2 5-2zm4 12.834c-.975.5-2.521.739-4 .739s-3.025-.238-4-.74V18c0 .257 1.375 1 4 1s4-.743 4-1zm0-7.595c-.975.5-2.521.738-4 .738s-3.025-.237-4-.738v6.334c0 .257 1.375 1 4 1s4-.743 4-1zm0-1.977c-.975.5-2.521.738-4 .738s-3.025-.237-4-.738v.715c0 .257 1.375 1 4 1s4-.743 4-1zM12 5c-2.625 0-4 .744-4 1 0 .257 1.375 1 4 1s4-.743 4-1c0-.256-1.375-1-4-1zm-2.108.648c.515 0 .932.143.932.32 0 .173-.417.316-.932.316-.514 0-.931-.143-.931-.317 0-.176.417-.319.93-.319zm4.329 0c.515 0 .932.143.932.32 0 .173-.417.316-.932.316-.514 0-.931-.143-.931-.317 0-.176.417-.319.93-.319z",
        })
  );
};
Echo.displayName = "Echo";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$u =
  (undefined && undefined.__assign) ||
  function () {
    __assign$u =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$u.apply(this, arguments);
  };
var Eye = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$u({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12.006 7c2.627 0 4.897 1.813 6.339 3.334.888.934.888 2.398 0 3.332-1.442 1.52-3.712 3.334-6.34 3.334-2.626 0-4.897-1.813-6.34-3.335-.887-.933-.887-2.396.002-3.331C7.107 8.814 9.379 7 12.006 7zm0 1c-2.392 0-4.544 1.893-5.614 3.023-.512.539-.512 1.415-.001 1.954 1.07 1.13 3.223 3.022 5.615 3.022 2.39 0 4.544-1.893 5.613-3.022.513-.539.513-1.415 0-1.954C16.55 9.893 14.398 8 12.007 8zm0 1c1.653 0 3 1.346 3 3s-1.347 3-3 3c-1.655 0-3-1.346-3-3s1.345-3 3-3zm0 1c-1.104 0-2 .897-2 2s.896 2 2 2c1.102 0 2-.897 2-2s-.898-2-2-2z",
    })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$v =
  (undefined && undefined.__assign) ||
  function () {
    __assign$v =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$v.apply(this, arguments);
  };
var EmojiPicker = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$v({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm3 8c0 1.657-1.343 3-3 3s-3-1.343-3-3zm-5-4.267c.414 0 .75.336.75.75s-.336.75-.75.75-.75-.336-.75-.75.336-.75.75-.75zm4 0c.414 0 .75.336.75.75s-.336.75-.75.75-.75-.336-.75-.75.336-.75.75-.75z",
    })
  );
};
EmojiPicker.displayName = "EmojiPicker";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$w =
  (undefined && undefined.__assign) ||
  function () {
    __assign$w =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$w.apply(this, arguments);
  };
var Feedback = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$w({}, props),
    React__default["default"].createElement("path", {
      d:
        "M11.434 5c.276 0 .5.224.5.5 0 .277-.224.5-.5.5H8.967C7.331 6 6 7.33 6 8.968v6.067C6 16.67 7.331 18 8.967 18h6.066C16.669 18 18 16.67 18 15.034v-2.467c0-.276.224-.5.5-.5s.5.224.5.5v2.467C19 17.22 17.221 19 15.033 19H8.967C6.779 19 5 17.22 5 15.034V8.967C5 6.78 6.779 5 8.967 5zm4.305.434c.565-.564 1.468-.58 2.014-.034l.848.848c.258.257.399.604.399.975 0 .386-.158.764-.433 1.04l-4.271 4.27c-.612.612-1.378 1.019-2.217 1.176l-.953.179c-.05.01-.1.014-.151.014-.21 0-.412-.08-.563-.226-.187-.181-.275-.445-.235-.706l.143-.953c.132-.884.558-1.723 1.2-2.365zM16.778 6h-.012c-.12.003-.232.053-.32.14l-.39.39.707.707c.195.195.195.512 0 .707-.098.098-.226.147-.353.147-.128 0-.256-.05-.354-.147l-.707-.707-3.121 3.122c-.492.49-.818 1.132-.92 1.805l-.103.69.69-.128c.64-.12 1.225-.432 1.694-.901l4.27-4.271c.09-.09.14-.21.14-.332 0-.104-.037-.2-.105-.268l-.848-.848c-.07-.07-.164-.106-.268-.106z",
    })
  );
};
Feedback.displayName = "Feedback";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$x =
  (undefined && undefined.__assign) ||
  function () {
    __assign$x =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$x.apply(this, arguments);
  };
var Hamburger = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$x({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.14-7 7s3.141 7 7 7 7-3.14 7-7-3.141-7-7-7zm3.5 8.5c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-7c-.276 0-.5-.224-.5-.5 0-.245.177-.45.41-.492l.09-.008h7zm-1-2c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-6c-.276 0-.5-.224-.5-.5 0-.245.177-.45.41-.492l.09-.008h6zm1-2c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-7c-.276 0-.5-.224-.5-.5 0-.245.177-.45.41-.492L8.5 9.5h7z",
    })
  );
};
Hamburger.displayName = "Hamburger";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$6 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledCircle = styled__default["default"].circle(
  templateObject_1$6 ||
    (templateObject_1$6 = __makeTemplateObject$6(
      ["\n  fill: ", ";\n"],
      ["\n  fill: ", ";\n"]
    )),
  function (props) {
    return props.theme.colors.primary.main;
  }
);
var templateObject_1$6;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$y =
  (undefined && undefined.__assign) ||
  function () {
    __assign$y =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$y.apply(this, arguments);
  };
var __rest$8 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var HandRaise = function (_a) {
  var isRaised = _a.isRaised,
    rest = __rest$8(_a, ["isRaised"]);
  return React__default["default"].createElement(
    Svg,
    __assign$y({}, rest),
    isRaised &&
      React__default["default"].createElement(StyledCircle, {
        id: "Circle",
        cx: "12",
        cy: "12",
        r: "10",
      }),
    React__default["default"].createElement("path", {
      d:
        "M6.386 12.04c-.11 0-.218.055-.317.163-.156.17-.05.694.213 1.059l1.804 2.467c.026.038.763 1.175 1.947 1.933.626.399 3.462 1.309 5.433-.303.76-.621 1.161-1.924 1.161-3.772V8.326c0-.388-.233-.728-.5-.728-.27 0-.5.334-.5.728v3.053c0 .276-.223.5-.5.5-.276 0-.5-.224-.5-.5V6.386c0-.343-.228-.632-.5-.632-.27 0-.5.289-.5.632v4.935c0 .277-.223.5-.5.5-.276 0-.5-.223-.5-.5V5.633c0-.343-.228-.633-.5-.633-.275 0-.5.284-.5.633v5.618c0 .276-.223.5-.5.5-.276 0-.5-.224-.5-.5v-4.19c0-.395-.228-.729-.5-.729-.27 0-.5.334-.5.729v6.824c0 .276-.223.5-.5.5-.138 0-.33-.058-.425-.158l-1.356-1.452c-.367-.469-.7-.724-.946-.735h-.014zm6.29 7.251c-1.42 0-2.667-.458-3.182-.787-1.376-.88-2.199-2.157-2.233-2.211L5.474 13.85c-.487-.673-.7-1.714-.142-2.323.303-.33.693-.51 1.11-.486.562.023 1.123.389 1.664 1.086l.521.557V7.061c0-.954.673-1.729 1.5-1.729.18 0 .352.036.511.104.09-.808.724-1.436 1.49-1.436.59 0 1.103.374 1.347.916.197-.104.42-.162.652-.162.827 0 1.5.732 1.5 1.632v.31c.156-.063.325-.098.5-.098.827 0 1.5.775 1.5 1.728v5.261c0 2.188-.514 3.718-1.528 4.547-1.064.869-2.298 1.157-3.424 1.157z",
      fill: isRaised ? "white" : "",
    })
  );
};
HandRaise.displayName = "HandRaise";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$z =
  (undefined && undefined.__assign) ||
  function () {
    __assign$z =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$z.apply(this, arguments);
  };
var Information = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$z({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm.016 6.476c.276 0 .5.224.5.5v2.498c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2.498c0-.276.224-.5.5-.5zM12 8.709c.414 0 .75.335.75.75 0 .414-.336.75-.75.75s-.75-.336-.75-.75c0-.415.336-.75.75-.75z",
    })
  );
};
Information.displayName = "Information";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$A =
  (undefined && undefined.__assign) ||
  function () {
    __assign$A =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$A.apply(this, arguments);
  };
var Laptop = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$A({}, props),
    React__default["default"].createElement("path", {
      d:
        "M19.5 17c.276 0 .5.224.5.5s-.224.5-.5.5h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zM17 6c1.103 0 2 .897 2 2v6c0 1.103-.897 2-2 2H7c-1.103 0-2-.897-2-2V8c0-1.103.897-2 2-2zm0 1H7c-.552 0-1 .449-1 1v6c0 .551.448 1 1 1h10c.552 0 1-.449 1-1V8c0-.551-.448-1-1-1z",
    })
  );
};
Laptop.displayName = "Laptop";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$B =
  (undefined && undefined.__assign) ||
  function () {
    __assign$B =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$B.apply(this, arguments);
  };
var LeaveMeeting = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$B({}, props),
    React__default["default"].createElement("path", {
      d:
        "M14.407 5c2.405 0 4.384 1.91 4.495 4.289l.005.211v5c0 2.405-1.91 4.384-4.29 4.495l-.21.005h-2c-1.372 0-2.647-.625-3.498-1.676-.174-.215-.14-.53.074-.704.215-.173.53-.14.703.074.62.765 1.524 1.24 2.509 1.3l.212.006h2c1.86 0 3.394-1.473 3.494-3.309l.006-.191v-5c0-1.86-1.473-3.395-3.31-3.495L14.408 6h-2c-.936 0-1.817.374-2.472 1.029-.195.195-.512.195-.707 0-.195-.196-.195-.513 0-.708.785-.783 1.825-1.255 2.939-1.315l.24-.006h2zM8.682 8.843c.174.173.193.443.058.637l-.058.07-1.976 1.974h6.658c.276 0 .5.224.5.5 0 .246-.177.45-.41.492l-.09.008H6.707L8.682 14.5c.195.195.195.511 0 .707-.174.173-.443.193-.638.058l-.07-.058-2.828-2.83-.013-.013-.032-.038.045.052c-.027-.027-.05-.056-.07-.087l-.02-.035-.019-.041-.006-.016-.007-.019-.008-.03-.005-.02-.006-.032c-.003-.02-.005-.041-.005-.062v-.022c0-.022.002-.043.005-.064L5 12.024c0-.036.004-.071.01-.105l.013-.045c.004-.015.01-.03.016-.044l.006-.014.01-.023.013-.021.007-.012.013-.02.013-.018.032-.038.013-.013 2.829-2.829c.195-.195.512-.195.707 0z",
    })
  );
};
LeaveMeeting.displayName = "LeaveMeeting";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$C =
  (undefined && undefined.__assign) ||
  function () {
    __assign$C =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$C.apply(this, arguments);
  };
var Like = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$C({}, props),
    React__default["default"].createElement("path", {
      d:
        "M18.977 12.053l-1.29 4.575C17.528 17.422 16.818 18 16 18H9.126c-.197 0-.357-.158-.357-.352V11.385l3.034-5.353c.123-.044.45-.069.76.105.479.271.732.897.733 1.842l.089 1.43c.02.45.389.803.84.803h3.194c.479 0 .926.211 1.228.58.298.364.415.837.33 1.261M7.337 18h-1.99C5.156 18 5 17.843 5 17.652V12.1c0-.19.156-.347.347-.347h2.037c.212 0 .385.173.385.385v5.431c0 .237-.193.43-.431.43m12.082-7.84c-.492-.602-1.22-.947-2.001-.947h-3.044l-.08-1.264c0-2.228-1.244-2.765-1.778-2.893-.577-.137-1.321-.028-1.55.423l-3.05 5.383c-.164-.069-.344-.108-.533-.108H5.347C4.605 10.753 4 11.358 4 12.1v5.552C4 18.394 4.605 19 5.347 19h1.99c.347 0 .66-.128.908-.333.238.204.544.333.88.333H16c1.29 0 2.413-.914 2.66-2.136l1.289-4.575c.153-.756-.04-1.53-.53-2.129",
    })
  );
};
Like.displayName = "Like";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$D =
  (undefined && undefined.__assign) ||
  function () {
    __assign$D =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$D.apply(this, arguments);
  };
var __rest$9 =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ListHandRaise = function (_a) {
  var rest = __rest$9(_a, []);
  return React__default["default"].createElement(
    Svg,
    __assign$D({}, rest),
    React__default["default"].createElement("path", {
      d:
        "M16.06 10.682c1.623 0 2.943 1.32 2.943 2.942v3.434c0 1.622-1.32 2.942-2.942 2.942h-3.34c-1.623 0-2.944-1.32-2.944-2.942v-3.434c0-1.622 1.32-2.942 2.944-2.942zm0 1h-3.34c-1.072 0-1.944.87-1.944 1.942v3.434c0 1.07.873 1.942 1.944 1.942h3.34c1.072 0 1.943-.871 1.943-1.942v-3.434c0-1.071-.872-1.942-1.942-1.942zm-.033 4.863c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-2.13c-.275 0-.5-.224-.5-.5 0-.245.178-.45.411-.492l.09-.008h2.129zm-3.109.146c.1.09.15.22.15.35 0 .07-.01.13-.04.19-.02.07-.06.12-.11.17-.09.09-.22.14-.35.14-.14 0-.26-.05-.35-.14-.05-.05-.09-.1-.11-.17-.03-.06-.04-.12-.04-.19 0-.13.05-.26.15-.35.18-.19.51-.19.7 0zm0-1.7c.1.09.15.221.15.351 0 .13-.05.26-.15.35-.09.1-.22.15-.35.15-.07 0-.13-.01-.19-.04-.07-.02-.12-.06-.16-.11-.1-.09-.15-.22-.15-.35 0-.07.01-.13.04-.19.02-.06.06-.12.11-.16.18-.19.521-.19.7 0zm-2.042-10.99c.485 0 .91.287 1.136.714.151-.064.314-.1.485-.1.68 0 1.24.566 1.304 1.286l.006.137v.123c.1-.029.203-.043.311-.043.68 0 1.24.597 1.304 1.359l.006.144v1.625c0 .276-.223.5-.5.5-.245 0-.45-.177-.492-.41l-.008-.09V7.621c0-.288-.164-.503-.31-.503-.13 0-.275.17-.305.41l-.006.093v1.674c0 .277-.223.5-.5.5-.245 0-.45-.176-.492-.41l-.008-.09V6.038c0-.23-.142-.423-.31-.423-.147 0-.275.148-.305.34l-.006.083V9.25c0 .276-.224.5-.5.5-.245 0-.45-.177-.492-.41l-.008-.09V5.423c0-.229-.142-.423-.31-.423-.147 0-.275.149-.305.34l-.006.083v3.768c0 .276-.224.5-.5.5-.245 0-.45-.177-.492-.41l-.008-.09V6.588c0-.287-.164-.5-.311-.5-.13 0-.274.168-.304.408l-.006.092v5.567c0 .276-.224.5-.5.5-.111 0-.249-.037-.348-.104l-.066-.056-1.1-1.185c-.403-.519-.637-.565-.7-.568-.026.001-.098-.003-.194.101-.07.078-.04.38.116.65l.064.1 1.461 2.012c.002.002.493.657 1.227 1.38.197.192.199.51.006.706-.098.1-.228.15-.357.15-.127 0-.253-.048-.35-.144-.745-.732-1.248-1.388-1.322-1.487l-.009-.012-1.466-2.019c-.426-.592-.599-1.47-.11-2.009.267-.292.609-.456.975-.427.438.018.87.272 1.284.754l.137.168.252.27V6.588c0-.828.588-1.5 1.31-1.5.117 0 .23.016.337.05C9.714 4.488 10.244 4 10.876 4zm4.318 10.84c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-1.296c-.276 0-.5-.224-.5-.5 0-.246.177-.45.41-.492l.09-.008h1.296zm-2.276-1.56c.1.101.15.22.15.36 0 .13-.05.25-.15.35-.09.09-.22.15-.35.15-.14 0-.26-.06-.35-.15-.1-.09-.15-.22-.15-.35 0-.07.01-.14.04-.2.02-.059.06-.11.11-.16.18-.18.521-.18.7 0zm3.294-.143c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-2.314c-.277 0-.5-.224-.5-.5 0-.246.177-.45.41-.492l.09-.008h2.314z",
    })
  );
};
ListHandRaise.displayName = "ListHandRaise";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$E =
  (undefined && undefined.__assign) ||
  function () {
    __assign$E =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$E.apply(this, arguments);
  };
var Lock = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$E({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 5c2.206 0 4 1.696 4 3.78v.924c1.153.356 2 1.418 2 2.687v3.786C18 17.734 16.733 19 15.177 19H8.823C7.267 19 6 17.734 6 16.177V12.39c0-1.27.847-2.331 2-2.687V8.78C8 6.696 9.794 5 12 5zm3.177 5.568H8.823C7.818 10.568 7 11.386 7 12.39v3.786C7 17.182 7.818 18 8.823 18h6.354C16.182 18 17 17.182 17 16.177V12.39c0-1.005-.818-1.823-1.823-1.823zm-3.186 2.831c.276 0 .5.224.5.5v1.066c0 .277-.224.5-.5.5s-.5-.223-.5-.5V13.9c0-.276.224-.5.5-.5zM12 6c-1.654 0-3 1.248-3 2.78v.789h6V8.78C15 7.247 13.654 6 12 6z",
    })
  );
};
Lock.displayName = "Lock";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$F =
  (undefined && undefined.__assign) ||
  function () {
    __assign$F =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$F.apply(this, arguments);
  };
var Meeting = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$F({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 14c.276 0 .5.224.5.5 0 .277-.224.5-.5.5-1.103 0-2 .897-2 2s.897 2 2 2c.806 0 1.529-.48 1.844-1.221.107-.256.398-.372.655-.266.254.108.373.4.265.655C14.293 19.28 13.208 20 12 20c-1.654 0-3-1.345-3-3 0-1.654 1.346-3 3-3zm5.504-4.5c.106-.256.398-.375.654-.269 1.12.47 1.842 1.556 1.842 2.77 0 1.653-1.346 3-3 3-1.655 0-3-1.347-3-3 0-.278.223-.5.5-.5.276 0 .5.222.5.5 0 1.102.897 2 2 2 1.102 0 2-.898 2-2 0-.81-.483-1.535-1.229-1.847-.255-.107-.374-.4-.267-.655zM7 9c1.654 0 3 1.346 3 3 0 .276-.224.5-.5.5S9 12.276 9 12c0-1.103-.897-2-2-2s-2 .897-2 2c0 .872.557 1.637 1.385 1.903.262.085.407.367.322.63-.068.212-.265.346-.476.346-.05 0-.102-.007-.153-.024C4.835 14.455 4 13.308 4 12c0-1.654 1.346-3 3-3zm5-5c1.654 0 3 1.346 3 3s-1.346 3-3 3c-.277 0-.5-.224-.5-.5 0-.277.223-.5.5-.5 1.102 0 2-.897 2-2s-.898-2-2-2c-.825 0-1.577.517-1.87 1.287-.099.26-.389.388-.646.29-.258-.1-.387-.389-.288-.647C9.636 4.776 10.763 4 12 4z",
    })
  );
};
Meeting.displayName = "Meeting";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$7 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __assign$G =
  (undefined && undefined.__assign) ||
  function () {
    __assign$G =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$G.apply(this, arguments);
  };
var __rest$a =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var SvgWithoutMicrophoneProps = function (_a) {
  var poorConnection = _a.poorConnection,
    muted = _a.muted,
    rest = __rest$a(_a, ["poorConnection", "muted"]);
  return React__default["default"].createElement(Svg, __assign$G({}, rest));
};
var StyledSvg = styled__default["default"](SvgWithoutMicrophoneProps)(
  templateObject_1$7 ||
    (templateObject_1$7 = __makeTemplateObject$7(
      ["\n  ", "\n"],
      ["\n  ", "\n"]
    )),
  function (props) {
    return props.poorConnection
      ? "color: " + props.theme.colors.error.light
      : "";
  }
);
var templateObject_1$7;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$H =
  (undefined && undefined.__assign) ||
  function () {
    __assign$H =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$H.apply(this, arguments);
  };
var __rest$b =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
function getPath(muted, poorConnection) {
  if (muted) {
    return poorConnection
      ? "M4.146 4.146c.196-.195.513-.195.708 0L9.168 8.46h.018l.813.815v.018l5.854 5.854c.002-.005.005-.008.008-.01l.724.724-.008.01 3.276 3.275c.195.195.195.512 0 .707-.098.098-.226.147-.354.147-.127 0-.255-.049-.352-.146l-3.281-3.281C14.82 17.459 13.475 18 11.998 18c-3.308 0-6-2.691-6-6 0-.277.224-.5.5-.5.278 0 .5.223.5.5 0 2.757 2.244 5 5 5 1.2 0 2.29-.436 3.147-1.146l-1.439-1.438c-.14.105-.287.207-.445.285l-.447-.895c.062-.03.116-.073.174-.11l-2.99-2.989v.941H9v-1.063h.88L4.147 4.853c-.196-.194-.196-.511 0-.707zM14.5 19c.276 0 .5.224.5.5s-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm3-7.5c.276 0 .5.224.5.5 0 1.106-.307 2.14-.83 3.031l-.748-.748c.357-.687.578-1.456.578-2.283 0-.276.224-.5.5-.5zm-6.293 2.317c.25.121.517.183.793.183l.016 1.001-.098-.008c-.359-.012-.76-.089-1.147-.275zm-1.085-1.278c.093.282.234.536.42.757l-.766.644c-.267-.319-.47-.685-.603-1.089zM15 11.618v.155c0 .325-.051.643-.139.95l-.867-.868c.001-.027.006-.055.006-.082v-.155h1zm0-2.126v1.062h-1V9.492h1zm0-2.125v1.062h-1V7.367h1zM9.155 6.201l.955.297c-.073.235-.11.48-.11.73v.17h-.463l-.512-.512c.024-.232.061-.463.13-.685zm5.079-1.128c.268.321.469.689.599 1.093l-.951.307c-.091-.283-.231-.537-.415-.759zm-3.514-.765l.453.891c-.246.126-.474.312-.656.535l-.776-.63c.274-.338.603-.604.979-.796zM12 4c.434 0 .853.098 1.245.29l-.44.897C12.553 5.064 12.282 5 12 5l-.031-1z"
      : "M14.5 19c.276 0 .5.224.5.5s-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zM4.146 4.146c.196-.195.512-.195.708 0l15 15c.195.196.195.512 0 .708-.098.097-.226.146-.354.146-.128 0-.256-.049-.354-.146l-3.282-3.283C14.819 17.458 13.475 18 12 18c-3.309 0-6-2.691-6-6 0-.276.224-.5.5-.5s.5.224.5.5c0 2.757 2.243 5 5 5 1.199 0 2.288-.437 3.146-1.146l-1.452-1.453c-.483.366-1.058.599-1.694.599-1.654 0-3-1.448-3-3.228V9.707L4.146 4.854c-.195-.196-.195-.512 0-.708zM17.5 11.5c.276 0 .5.224.5.5 0 1.112-.31 2.152-.84 3.046l-.747-.746c.362-.693.587-1.467.587-2.3 0-.276.224-.5.5-.5zm-7.5-.793v1.065c0 1.229.897 2.228 2 2.228.362 0 .7-.111.992-.301L10 10.707zm2-6.708c1.654 0 3 1.45 3 3.228v4.546c0 .337-.062.655-.151.962l-.859-.858.01-.104V7.228C14 5.998 13.103 5 12 5s-2 .998-2 2.228v.658l-.971-.97C9.178 5.284 10.445 3.998 12 3.998z";
  }
  return poorConnection
    ? "M14.5 19c.276 0 .5.224.5.5s-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5zm3-7.5c.276 0 .5.224.5.5 0 3.309-2.691 6-6 6s-6-2.691-6-6c0-.276.224-.5.5-.5s.5.224.5.5c0 2.757 2.243 5 5 5s5-2.243 5-5c0-.276.224-.5.5-.5zm-6.293 2.318c.25.12.517.183.793.183l.013.958v-.46l.085.492H12.014c-.486-.002-.876-.096-1.242-.274l.435-.9zm2.268-.543l.77.637c-.275.335-.606.6-.983.79l-.447-.896c.25-.125.473-.303.66-.53zm-3.353-.736c.093.283.235.537.42.757l-.765.645c-.268-.32-.472-.687-.604-1.09l.949-.312zM15 11.619v.155c0 .359-.053.71-.16 1.043l-.953-.305c.075-.233.113-.482.113-.738v-.155h1zm-5-1.033v1.063H9v-1.063h1zm5-1.093v1.063h-1V9.492h1zm-5-1.03v1.062H9V8.46h1zm5-1.095V8.43h-1V7.367h1zM9.156 6.2l.955.3c-.074.232-.111.478-.111.728v.17H9v-.17c0-.351.053-.696.156-1.027zm5.08-1.127c.267.32.468.688.598 1.093l-.951.306c-.091-.282-.23-.537-.415-.759l.768-.64zm-3.516-.766l.453.891c-.246.126-.473.311-.656.535l-.775-.63c.273-.337.602-.603.978-.795zM12 4c.433 0 .852.098 1.245.29l-.44.899C12.55 5.064 12.28 5 12 5l-.031-1h.03z"
    : "M14.5 19c.276 0 .5.224.5.5s-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm3-7.5c.276 0 .5.224.5.5 0 3.309-2.691 6-6 6s-6-2.691-6-6c0-.276.224-.5.5-.5s.5.224.5.5c0 2.757 2.243 5 5 5s5-2.243 5-5c0-.276.224-.5.5-.5zM12 4c1.654 0 3 1.448 3 3.227v4.546C15 13.552 13.654 15 12 15s-3-1.448-3-3.227V7.227C9 5.447 10.346 4 12 4zm0 1c-1.103 0-2 .999-2 2.227v4.546C10 13 10.897 14 12 14s2-1 2-2.227V7.227C14 5.999 13.103 5 12 5z";
}
var Microphone = function (_a) {
  var _b = _a.muted,
    muted = _b === void 0 ? false : _b,
    _c = _a.poorConnection,
    poorConnection = _c === void 0 ? false : _c,
    rest = __rest$b(_a, ["muted", "poorConnection"]);
  var iconPath = getPath(muted, poorConnection);
  return React__default["default"].createElement(
    StyledSvg,
    __assign$H({}, rest, {
      muted: muted,
      poorConnection: poorConnection,
      title: muted ? "Muted microphone" : "Microphone",
      "data-testid": poorConnection
        ? "poor-connection-mic"
        : "good-connection-mic",
    }),
    React__default["default"].createElement("path", { d: iconPath })
  );
};
Microphone.displayName = "Microphone";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$I =
  (undefined && undefined.__assign) ||
  function () {
    __assign$I =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$I.apply(this, arguments);
  };
var Pause = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$I({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm-2 3.663c.827 0 1.5.673 1.5 1.5v3.673c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5v-3.673c0-.827.673-1.5 1.5-1.5zm4 0c.827 0 1.5.673 1.5 1.5v3.673c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5v-3.673c0-.827.673-1.5 1.5-1.5zm-4 1c-.275 0-.5.225-.5.5v3.673c0 .275.225.5.5.5s.5-.225.5-.5v-3.673c0-.275-.225-.5-.5-.5zm4 0c-.275 0-.5.225-.5.5v3.673c0 .275.225.5.5.5s.5-.225.5-.5v-3.673c0-.275-.225-.5-.5-.5z",
    })
  );
};
Pause.displayName = "Pause";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$J =
  (undefined && undefined.__assign) ||
  function () {
    __assign$J =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$J.apply(this, arguments);
  };
var __rest$c =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Pin = function (_a) {
  var unpin = _a.unpin,
    rest = __rest$c(_a, ["unpin"]);
  return React__default["default"].createElement(
    Svg,
    __assign$J({}, rest),
    unpin
      ? React__default["default"].createElement("path", {
          d:
            "M4.147 4.146c.195-.195.51-.195.707 0L14.707 14l.979.979 4.168 4.167c.195.196.195.512 0 .708-.098.097-.226.146-.354.146-.128 0-.256-.049-.353-.146L14.293 15h-1.791v3.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5V15H8.474c-.583 0-1.096-.324-1.337-.845-.236-.507-.156-1.089.206-1.518l.977-1.157c.425-.47.58-1.151.604-1.849L4.147 4.854c-.196-.196-.196-.512 0-.708zM14.046 5c.01 0 .02.005.03.005.505.018.969.266 1.246.681.28.418.332.942.14 1.405 0 .005-1.024 3.009.212 4.376l.988 1.17c.363.428.442 1.01.206 1.518-.061.134-.141.253-.234.357l-.712-.71c.02-.028.032-.053.039-.067.034-.073.097-.264-.062-.452l-.978-1.157c-1.623-1.796-.444-5.244-.392-5.39.074-.183.056-.353-.038-.494-.103-.154-.272-.242-.464-.242H9.979c-.193 0-.362.088-.465.242-.094.141-.111.311-.047.468.018.05.133.388.244.88L8.446 6.324c.03-.223.106-.442.237-.638.287-.43.77-.686 1.296-.686zm-4.223 5.53c-.117.587-.337 1.151-.75 1.608l-.966 1.144c-.16.188-.097.379-.063.452.028.062.146.266.43.266h4.819z",
        })
      : React__default["default"].createElement("path", {
          d:
            "M15.959 13.734c-.028.062-.146.266-.431.266H8.472c-.285 0-.402-.204-.431-.266-.033-.073-.096-.264.064-.452l.965-1.144c1.634-1.809.455-5.257.394-5.429-.065-.156-.047-.326.047-.467.103-.154.272-.242.465-.242h4.048c.193 0 .362.088.465.242.094.141.112.311.037.493-.051.146-1.23 3.594.393 5.39l.978 1.157c.159.187.096.38.062.452m.7-1.098l-.987-1.169c-1.236-1.368-.212-4.372-.212-4.376.19-.462.14-.987-.14-1.404-.278-.417-.741-.665-1.246-.682-.011 0-.02-.005-.03-.005H9.976c-.525 0-1.01.256-1.296.687-.28.417-.331.942-.15 1.378.293.838.828 3.263-.213 4.415l-.976 1.156c-.363.43-.443 1.012-.206 1.52.24.52.754.844 1.337.844H11.5v3.5c0 .276.224.5.5.5s.5-.224.5-.5V15h3.028c.583 0 1.096-.325 1.338-.845.236-.508.156-1.09-.206-1.519",
        })
  );
};
Pin.displayName = "Pin";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$K =
  (undefined && undefined.__assign) ||
  function () {
    __assign$K =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$K.apply(this, arguments);
  };
var Phone = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$K({}, props),
    React__default["default"].createElement("path", {
      d:
        "M11.999 10.19c.738 0 3.194.089 3.792 1.241.08.158.117.315.138.418l.228 1.112c.033.167.116.318.239.438l.423.414c.349.341.919.343 1.27 0l.649-.635c.308-.3.347-.777.09-1.107-.776-1.005-2.696-2.698-6.83-2.771-4.132.073-6.052 1.766-6.828 2.77-.257.331-.218.808.09 1.108l.649.635c.349.341.919.343 1.27 0L7.6 13.4c.124-.121.207-.272.24-.438l.228-1.116c.02-.1.058-.257.137-.412.599-1.155 3.055-1.244 3.793-1.244m5.455 4.877c-.483 0-.966-.18-1.334-.539l-.422-.413c-.266-.26-.447-.59-.521-.953l-.23-1.115c-.008-.047-.022-.113-.046-.158-.145-.28-1.17-.699-2.902-.699-1.732 0-2.757.419-2.903.702-.023.042-.037.108-.046.152l-.23 1.119c-.073.362-.254.692-.521.953l-.421.412c-.736.719-1.932.719-2.668 0l-.65-.635c-.67-.656-.75-1.703-.181-2.435.887-1.146 3.056-3.08 7.61-3.158h.019c4.555.078 6.724 2.012 7.61 3.159.569.731.49 1.778-.181 2.434l-.65.635c-.367.359-.85.539-1.333.539",
    })
  );
};
Phone.displayName = "Phone";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$L =
  (undefined && undefined.__assign) ||
  function () {
    __assign$L =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$L.apply(this, arguments);
  };
var Play = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$L({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm-1.342 3.803c.402-.211.89-.181 1.265.083l3.02 2.113c.325.229.52.603.52 1 0 .4-.195.774-.52 1.002l-3.02 2.114c-.21.147-.455.22-.7.22-.194 0-.387-.045-.565-.137-.406-.211-.658-.627-.658-1.084V9.887c0-.457.252-.873.658-1.084zm.565.86c-.043 0-.08.014-.103.027-.045.023-.12.08-.12.197v4.227c0 .117.075.173.12.197.044.024.135.05.228-.015l3.02-2.113c.082-.058.095-.14.095-.183 0-.043-.013-.125-.095-.182l-3.02-2.114c-.043-.03-.086-.041-.125-.041z",
    })
  );
};
Play.displayName = "Play";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$M =
  (undefined && undefined.__assign) ||
  function () {
    __assign$M =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$M.apply(this, arguments);
  };
var Presenter = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$M({}, props),
    React__default["default"].createElement("path", {
      d:
        "M12.966 10c1.662 0 3.013 1.343 3.034 3h.731c.425 0 .82.216 1.055.579.248.379.287.855.103 1.272l-1.237 3.804c-.069.211-.265.345-.476.345-.05 0-.103-.008-.155-.024-.263-.086-.405-.369-.32-.631l1.255-3.85c.064-.154.055-.274-.007-.37-.03-.047-.1-.125-.218-.125H7.276c-.118 0-.187.078-.218.125-.062.096-.07.216-.024.323l1.272 3.897c.085.262-.057.545-.32.631-.052.016-.104.024-.155.024-.21 0-.406-.134-.476-.345L6.1 14.804c-.166-.37-.127-.846.121-1.225.237-.363.63-.579 1.055-.579h.732c.02-1.657 1.372-3 3.034-3zm0 1h-1.924c-1.112 0-2.018.894-2.038 2h6c-.02-1.106-.927-2-2.038-2zm-.87-6c1.104 0 2 .897 2 2s-.896 2-2 2c-1.102 0-2-.897-2-2s.898-2 2-2zm0 1c-.551 0-1 .449-1 1 0 .551.449 1 1 1 .553 0 1-.449 1-1 0-.551-.447-1-1-1z",
    })
  );
};
Presenter.displayName = "Presenter";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$N =
  (undefined && undefined.__assign) ||
  function () {
    __assign$N =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$N.apply(this, arguments);
  };
var Record = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$N({}, props),
    React__default["default"].createElement("path", {
      d:
        "M17.073 7C18.136 7 19 7.864 19 8.926v7.021c0 1.062-.864 1.926-1.927 1.926H6.926C5.864 17.873 5 17.01 5 15.947v-7.02C5 7.863 5.864 7 6.926 7zm0 1H6.926C6.415 8 6 8.415 6 8.926v7.021c0 .511.415.926.926.926h10.147c.511 0 .927-.415.927-.926v-7.02c0-.512-.416-.927-.927-.927zm-2.533 2.367c1.142 0 2.07.929 2.07 2.07 0 1.14-.928 2.069-2.07 2.069H9.459c-1.141 0-2.069-.93-2.069-2.07 0-1.14.928-2.07 2.069-2.07 1.142 0 2.07.93 2.07 2.07 0 .393-.116.757-.306 1.07h1.554c-.19-.313-.306-.677-.306-1.07 0-1.14.928-2.07 2.069-2.07zm0 1c-.59 0-1.069.48-1.069 1.07 0 .59.479 1.069 1.069 1.069s1.07-.48 1.07-1.07c0-.59-.48-1.07-1.07-1.07zm-5.081 0c-.59 0-1.069.48-1.069 1.07 0 .59.479 1.069 1.069 1.069s1.07-.48 1.07-1.07c0-.59-.48-1.07-1.07-1.07z",
    })
  );
};
Record.displayName = "Record";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$O =
  (undefined && undefined.__assign) ||
  function () {
    __assign$O =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$O.apply(this, arguments);
  };
var Remove = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$O({}, props),
    React__default["default"].createElement("path", {
      d:
        "M14.5 5C16.981 5 19 7.019 19 9.5v5c0 2.481-2.019 4.5-4.5 4.5h-5C7.019 19 5 16.981 5 14.5v-5C5 7.019 7.019 5 9.5 5zm0 1h-5C7.57 6 6 7.57 6 9.5v5C6 16.43 7.57 18 9.5 18h5c1.93 0 3.5-1.57 3.5-3.5v-5C18 7.57 16.43 6 14.5 6zM9.172 9.17c.195-.194.511-.194.707 0L12 11.293l2.121-2.121c.195-.195.512-.195.707 0 .195.195.195.512 0 .707L12.708 12l2.12 2.12c.195.197.195.513 0 .708-.098.098-.226.147-.354.147-.127 0-.255-.05-.353-.147l-2.12-2.121-2.122 2.12c-.098.099-.226.148-.354.148-.128 0-.256-.05-.353-.147-.196-.195-.196-.511 0-.707L11.293 12l-2.12-2.122c-.197-.195-.197-.512 0-.707z",
    })
  );
};
Remove.displayName = "Remove";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$P =
  (undefined && undefined.__assign) ||
  function () {
    __assign$P =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$P.apply(this, arguments);
  };
var Rooms = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$P({}, props, { title: "Rooms" }),
    React__default["default"].createElement("path", {
      d:
        "M15.962 6.99C17.637 6.99 19 8.353 19 10.028v3.623c0 1.675-1.363 3.038-3.038 3.038h-2.1c-1.356 0-3.433.663-4.537 1.448l-.994.706c-.146.103-.316.156-.487.156-.133 0-.266-.03-.389-.095-.28-.145-.455-.432-.455-.748v-8.128C7 8.353 8.363 6.99 10.038 6.99h5.924zm0 1h-5.924C8.914 7.99 8 8.904 8 10.028v7.824l.746-.529c1.266-.9 3.561-1.634 5.115-1.634h2.101c1.124 0 2.038-.914 2.038-2.038v-3.623c0-1.124-.914-2.038-2.038-2.038zM13.243 5c.277 0 .5.224.5.5s-.223.5-.5.5H8.497C7.12 6 6 7.12 6 8.497v6.627c0 .276-.224.5-.5.5s-.5-.224-.5-.5V8.497C5 6.568 6.568 5 8.497 5h4.746z",
    })
  );
};
Rooms.displayName = "Rooms";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$Q =
  (undefined && undefined.__assign) ||
  function () {
    __assign$Q =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$Q.apply(this, arguments);
  };
var Search = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$Q({}, props),
    React__default["default"].createElement("path", {
      d:
        "M11 16c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5m7.852 2.145l-3.294-3.253C16.455 13.843 17 12.485 17 11c0-3.309-2.691-6-6-6s-6 2.691-6 6 2.691 6 6 6c1.464 0 2.807-.528 3.849-1.403l3.299 3.258c.098.097.225.145.352.145.129 0 .258-.05.355-.148.195-.197.193-.514-.003-.707",
    })
  );
};
Search.displayName = "Search";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$R =
  (undefined && undefined.__assign) ||
  function () {
    __assign$R =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$R.apply(this, arguments);
  };
var Share = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$R({}, props),
    React__default["default"].createElement("path", {
      d:
        "M15.239 15.197c.778-.778 2.047-.779 2.829.003.78.781.781 2.05.002 2.828-.389.39-.9.584-1.412.584-.462 0-.92-.168-1.293-.486-.02.014-.033.033-.055.045-1.027.551-2.16.833-3.303.833-.592 0-1.187-.075-1.771-.227-.268-.07-.428-.343-.357-.61.069-.266.34-.429.609-.358 1.452.377 2.975.197 4.299-.498-.266-.71-.118-1.543.452-2.114zM5.747 9.866l.09.014c.268.07.428.343.357.61-.373 1.434-.202 2.924.468 4.235.213-.077.44-.123.673-.123.537 0 1.038.208 1.417.586.78.781.781 2.05.002 2.83-.377.376-.877.584-1.411.584-.537 0-1.04-.21-1.417-.588-.378-.378-.587-.88-.587-1.414 0-.486.178-.94.493-1.303C5 13.74 4.78 11.953 5.228 10.238c.069-.266.34-.426.609-.358zm10.904 5.747c-.256 0-.511.097-.705.291-.389.39-.388 1.024.003 1.415.391.39 1.025.39 1.414.002.389-.389.388-1.023-.002-1.414-.196-.196-.453-.294-.71-.294zm-9.314-.01c-.268 0-.518.102-.707.29-.188.188-.292.44-.29.706 0 .267.104.52.293.708.19.19.44.294.708.295.268 0 .518-.104.706-.292.39-.39.388-1.024-.003-1.415-.189-.189-.44-.293-.708-.293zm7.807-9.594c.777-.778 2.047-.779 2.828.002.72.72.77 1.847.165 2.631.862 1.572 1.09 3.388.637 5.125-.059.225-.26.374-.483.374-.042 0-.084-.005-.126-.016-.268-.07-.428-.343-.358-.61.374-1.435.191-2.929-.484-4.242-.242.1-.5.15-.76.15-.514 0-1.026-.195-1.417-.586-.78-.78-.78-2.049-.002-2.828zm-6.49-.144c1.568-.86 3.363-1.092 5.111-.636.268.07.428.343.358.61-.07.267-.34.427-.61.358-1.442-.377-2.926-.207-4.234.463.104.244.161.509.162.783 0 .534-.207 1.037-.585 1.414-.39.389-.9.584-1.412.584-.513 0-1.026-.196-1.417-.586-.78-.781-.78-2.05-.002-2.83.377-.375.878-.583 1.411-.583.45 0 .87.154 1.218.423zm-1.216.577c-.268 0-.518.104-.706.29-.389.39-.388 1.025.002 1.416.392.39 1.025.39 1.415.002.188-.188.292-.44.292-.706 0-.244-.098-.47-.257-.651-.014-.017-.033-.024-.045-.043-.005-.008-.005-.017-.01-.025-.187-.18-.43-.283-.69-.283zm9.118-.017c-.256 0-.51.097-.705.291-.389.39-.388 1.023.002 1.414.393.392 1.026.392 1.415.002.39-.389.388-1.023-.003-1.414-.195-.195-.453-.293-.709-.293z",
    })
  );
};
Share.displayName = "Share";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$S =
  (undefined && undefined.__assign) ||
  function () {
    __assign$S =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$S.apply(this, arguments);
  };
var SignalStrength = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$S({}, props),
    React__default["default"].createElement("path", {
      d:
        "M17.366 5c.772 0 1.4.629 1.4 1.4v11.2c0 .772-.628 1.4-1.4 1.4h-1.2c-.772 0-1.4-.628-1.4-1.4V6.4c0-.771.628-1.4 1.4-1.4zm-5 4c.772 0 1.4.629 1.4 1.4v7.2c0 .772-.628 1.4-1.4 1.4h-1.2c-.772 0-1.4-.628-1.4-1.4v-7.2c0-.771.628-1.4 1.4-1.4zM7.6 13c.772 0 1.4.629 1.4 1.4v3.2c0 .772-.628 1.4-1.4 1.4H6.4c-.772 0-1.4-.628-1.4-1.4v-3.2c0-.771.628-1.4 1.4-1.4zm9.766-7h-1.2c-.22 0-.4.18-.4.4v11.2c0 .22.18.4.4.4h1.2c.22 0 .4-.18.4-.4V6.4c0-.22-.18-.4-.4-.4zm-5 4h-1.2c-.22 0-.4.18-.4.4v7.2c0 .22.18.4.4.4h1.2c.22 0 .4-.18.4-.4v-7.2c0-.22-.18-.4-.4-.4zM7.6 14H6.4c-.22 0-.4.18-.4.4v3.2c0 .22.18.4.4.4h1.2c.22 0 .4-.18.4-.4v-3.2c0-.22-.18-.4-.4-.4z",
    })
  );
};
SignalStrength.displayName = "SignalStrength";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$T =
  (undefined && undefined.__assign) ||
  function () {
    __assign$T =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$T.apply(this, arguments);
  };
var __rest$d =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Sound = function (_a) {
  var disabled = _a.disabled,
    rest = __rest$d(_a, ["disabled"]);
  return React__default["default"].createElement(
    Svg,
    __assign$T({}, rest),
    disabled
      ? React__default["default"].createElement("path", {
          d:
            "M10.939 7.261c.393-.297.914-.344 1.361-.124.431.213.7.638.7 1.11v7.506c0 .472-.269.897-.7 1.11-.187.092-.385.137-.582.137-.28 0-.557-.09-.788-.268l-2.486-1.728c-.087-.06-.193-.093-.302-.093H6.256C5.563 14.911 5 14.36 5 13.682v-3.358c0-.68.566-1.235 1.263-1.235h1.88c.108 0 .213-.032.298-.092zm.918.772c-.042-.019-.182-.077-.32.03l-.018.012-2.505 1.741c-.253.178-.555.273-.871.273h-1.88c-.145 0-.263.105-.263.235v3.358c0 .127.115.23.256.23h1.886c.316 0 .618.093.874.272l2.503 1.741c.159.12.297.062.338.042.053-.027.143-.089.143-.214V8.247c0-.125-.09-.187-.143-.214zM14.9 10.13c.195-.195.512-.195.707 0l1.163 1.163 1.163-1.163c.195-.195.512-.195.707 0 .195.195.195.512 0 .707L17.477 12l1.163 1.163c.195.195.195.512 0 .707-.098.098-.226.147-.352.147-.128 0-.256-.049-.355-.147l-1.163-1.163-1.162 1.163c-.099.098-.226.147-.354.147-.128 0-.255-.049-.354-.147-.194-.195-.194-.512 0-.707L16.064 12 14.9 10.837c-.194-.195-.194-.512 0-.707z",
        })
      : React__default["default"].createElement("path", {
          d:
            "M10.939 7.26c.397-.295.914-.343 1.361-.123.431.213.7.638.7 1.11v7.506c0 .473-.269.898-.7 1.111-.187.092-.386.137-.582.137-.28 0-.557-.091-.788-.269l-2.486-1.727c-.088-.061-.194-.094-.302-.094H6.256c-.693 0-1.256-.552-1.256-1.229v-3.357c0-.681.566-1.236 1.263-1.236h1.88c.108 0 .214-.033.3-.092zm5.148.054c.176-.211.49-.241.704-.065 1.406 1.164 2.213 2.896 2.213 4.751 0 1.855-.807 3.588-2.213 4.752-.094.077-.207.115-.319.115-.144 0-.286-.061-.385-.18-.177-.213-.147-.529.065-.705 1.177-.974 1.852-2.425 1.852-3.982 0-1.556-.675-3.007-1.852-3.981-.212-.176-.242-.492-.065-.705zm-4.23.719c-.041-.02-.183-.077-.32.029l-.018.013-2.505 1.742c-.255.178-.556.272-.871.272h-1.88c-.145 0-.263.106-.263.236v3.357c0 .127.115.229.256.229h1.886c.315 0 .617.095.874.274l2.503 1.741c.157.117.298.062.337.042.054-.027.144-.09.144-.215V8.247c0-.125-.09-.187-.143-.214zm2.841 1.62c.181-.21.496-.232.705-.053.707.608 1.112 1.483 1.112 2.4 0 .917-.405 1.793-1.112 2.402-.095.08-.21.12-.326.12-.14 0-.28-.058-.379-.173-.18-.21-.156-.524.053-.705.486-.42.764-1.018.764-1.644 0-.625-.278-1.223-.764-1.642-.209-.181-.233-.496-.053-.705z",
        })
  );
};
Sound.displayName = "Sound";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$U =
  (undefined && undefined.__assign) ||
  function () {
    __assign$U =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$U.apply(this, arguments);
  };
var Spinner = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$U({}, props, {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
    }),
    React__default["default"].createElement(
      "g",
      { fill: "none", fillRule: "evenodd" },
      React__default["default"].createElement("path", { d: "M0 0H24V24H0z" }),
      React__default["default"].createElement(
        "g",
        { fill: "currentColor" },
        React__default["default"].createElement("path", {
          d:
            "M8 0c.316 0 .571.256.571.571V4c0 .316-.255.571-.571.571-.316 0-.571-.255-.571-.571V.571C7.429.256 7.684 0 8 0z",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M14.928 4c.158.273.064.623-.209.78l-2.97 1.715c-.272.158-.622.064-.78-.21-.158-.273-.064-.622.21-.78l2.969-1.714c.273-.158.622-.064.78.209z",
          opacity: ".2",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M12 1.072c.273.158.367.507.21.78l-1.715 2.97c-.158.273-.507.367-.78.209-.274-.158-.368-.508-.21-.78l1.714-2.97c.158-.273.508-.367.781-.21z",
          opacity: ".12",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M16 8c0 .316-.256.571-.571.571H12c-.316 0-.571-.255-.571-.571 0-.316.255-.571.571-.571h3.429c.315 0 .571.255.571.571z",
          opacity: ".28",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M12 14.928c-.273.158-.623.064-.78-.209l-1.715-2.97c-.158-.272-.064-.622.21-.78.273-.158.622-.064.78.21l1.714 2.969c.158.273.064.622-.209.78z",
          opacity: ".44",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M14.928 12c-.158.273-.507.367-.78.21l-2.97-1.715c-.273-.158-.367-.507-.209-.78.158-.274.508-.368.78-.21l2.97 1.714c.273.158.367.508.21.781z",
          opacity: ".36",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M8 16c-.316 0-.571-.256-.571-.571V12c0-.316.255-.571.571-.571.316 0 .571.255.571.571v3.429c0 .315-.255.571-.571.571z",
          opacity: ".52",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M1.072 12c-.158-.273-.064-.623.209-.78l2.97-1.715c.272-.158.622-.064.78.21.158.273.064.622-.21.78l-2.969 1.714c-.273.158-.622.064-.78-.209z",
          opacity: ".68",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M4 14.928c-.273-.158-.367-.507-.21-.78l1.715-2.97c.158-.273.507-.367.78-.209.274.158.368.508.21.78L4.78 14.72c-.158.273-.508.367-.781.21z",
          opacity: ".6",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M0 8c0-.316.256-.571.571-.571H4c.316 0 .571.255.571.571 0 .316-.255.571-.571.571H.571C.256 8.571 0 8.316 0 8z",
          opacity: ".76",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M4 1.072c.273-.158.623-.064.78.209l1.715 2.97c.158.272.064.622-.21.78-.273.158-.622.064-.78-.21L3.791 1.853c-.158-.273-.064-.622.209-.78z",
          opacity: ".92",
          transform: "translate(4 4)",
        }),
        React__default["default"].createElement("path", {
          d:
            "M1.072 4c.158-.273.507-.367.78-.21l2.97 1.715c.273.158.367.507.209.78-.158.274-.508.368-.78.21L1.28 4.78c-.273-.158-.367-.508-.21-.781z",
          opacity: ".84",
          transform: "translate(4 4)",
        })
      )
    )
  );
};
Spinner.displayName = "Spinner";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$V =
  (undefined && undefined.__assign) ||
  function () {
    __assign$V =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$V.apply(this, arguments);
  };
var UpAndDownCaret = function (props) {
  return React__default["default"].createElement(
    Svg,
    __assign$V({}, props),
    React__default["default"].createElement("path", {
      d:
        "M8.824 9.88c-.21.18-.526.154-.705-.056-.159-.187-.156-.457-.006-.64l.063-.065 3.523-3c.165-.14.397-.156.577-.05l.074.052 3.477 3c.209.18.232.497.052.706-.16.185-.428.224-.632.104l-.074-.052-3.151-2.72-3.198 2.722zM15.176 14.12c.21-.18.526-.154.705.056.159.187.157.457.006.64l-.063.065-3.523 3c-.165.14-.397.156-.577.05l-.074-.052-3.477-3c-.209-.18-.232-.497-.052-.706.16-.185.428-.224.632-.104l.074.052 3.151 2.72 3.198-2.722z",
    })
  );
};
UpAndDownCaret.displayName = "UpAndDownCaret";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$W =
  (undefined && undefined.__assign) ||
  function () {
    __assign$W =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$W.apply(this, arguments);
  };
var Checkbox = function (props) {
  var checked = props.checked,
    onChange = props.onChange,
    value = props.value;
  var checkboxNode = React.useRef(null);
  var handleChange = function () {
    var _a, _b;
    (_a = checkboxNode.current) === null || _a === void 0 ? void 0 : _a.click(); // simulate click the native checkbox
    (_b = checkboxNode.current) === null || _b === void 0 ? void 0 : _b.focus();
  };
  return React__default["default"].createElement(
    React__default["default"].Fragment,
    null,
    React__default["default"].createElement(
      HiddenCheckbox,
      __assign$W({}, props, {
        "data-testid": "hidden-checkbox",
        ref: checkboxNode,
        type: "checkbox",
        value: value,
        onChange: onChange,
      })
    ),
    React__default["default"].createElement(
      StyledCheckbox,
      {
        "data-testid": "styled-checkbox",
        checked: checked,
        className: "ch-checkbox",
        onClick: handleChange,
      },
      checked &&
        React__default["default"].createElement(Check, {
          "data-testid": "check",
        })
    )
  );
};
Checkbox.displayName = "Checkbox";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var ControlBarContext = React.createContext({
  showLabels: false,
  layout: "top",
});
var useControlBarContext = function () {
  return React.useContext(ControlBarContext);
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$8 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var layoutMap = {
  "undocked-vertical": "flex-direction: column;",
  "undocked-horizontal": "flex-direction: row;",
  top: "flex-direction: row; width: 100%; top: 0; position: fixed;",
  bottom: "flex-direction: row; width: 100%; bottom: 0; position: fixed;",
  right: "flex-direction: column; height: 100%; right: 0; position: fixed;",
  left: "flex-direction: column; height: 100%; left: 0; position: fixed;",
};
var gridTemplateColumnMap = {
  popOver: "grid-template-columns: 2.5rem minmax(0.5rem, auto);",
  "popOver&vertical": "grid-template-columns: 1.5rem 1.5rem 1.5rem",
};
var isVertical = function (layout) {
  return (
    layout === "right" || layout === "left" || layout === "undocked-vertical"
  );
};
var isUndocked = function (layout) {
  return layout === "undocked-vertical" || layout === "undocked-horizontal";
};
var unsetPosition = {
  top: "unset;",
  bottom: "unset;",
  right: "unset;",
  left: "unset;",
};
function responsiveStylesBlock(props) {
  return styled.css(
    templateObject_1$8 ||
      (templateObject_1$8 = __makeTemplateObject$8(
        [
          "  \n    ",
          " {\n      ",
          "\n      ",
          ";\n      box-shadow: ",
          ";\n      border: none;\n      height: ",
          ";\n      width: ",
          ";\n    }\n\n    ",
          " {\n      justify-content: ",
          ";\n      ",
          "\n      ",
          ";\n      box-shadow: ",
          ";\n      border: none;\n    }\n  ",
        ],
        [
          "  \n    ",
          " {\n      ",
          "\n      ",
          ";\n      box-shadow: ",
          ";\n      border: none;\n      height: ",
          ";\n      width: ",
          ";\n    }\n\n    ",
          " {\n      justify-content: ",
          ";\n      ",
          "\n      ",
          ";\n      box-shadow: ",
          ";\n      border: none;\n    }\n  ",
        ]
      )),
    function (_a) {
      var theme = _a.theme;
      return theme.mediaQueries.max.sm;
    },
    unsetPosition,
    function (props) {
      return isVertical(props.layout) ? layoutMap["left"] : layoutMap["bottom"];
    },
    function (props) {
      return props.theme.controlBar.shadow;
    },
    function (props) {
      return isVertical(props.layout) && "100%";
    },
    function (props) {
      return !isVertical(props.layout) && "100%";
    },
    function (_a) {
      var theme = _a.theme;
      return theme.mediaQueries.max.xs;
    },
    function (props) {
      return isVertical(props.layout) ? "center" : "space-around";
    },
    unsetPosition,
    function (props) {
      return isVertical(props.layout) ? layoutMap["left"] : layoutMap["bottom"];
    },
    function (_a) {
      var theme = _a.theme;
      return theme.controlBar.shadow;
    }
  );
}
var StyledControlBar = styled__default["default"].div(
  templateObject_2$3 ||
    (templateObject_2$3 = __makeTemplateObject$8(
      [
        "\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: ",
        ";\n  background-color: ",
        ";\n  opacity: ",
        ";\n  border: ",
        ";\n  box-shadow: ",
        ";\n  ",
        ";\n\n  ",
        "\n\n  width: ",
        ";\n  height: ",
        ";\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: ",
        ";\n  background-color: ",
        ";\n  opacity: ",
        ";\n  border: ",
        ";\n  box-shadow: ",
        ";\n  ",
        ";\n\n  ",
        "\n\n  width: ",
        ";\n  height: ",
        ";\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (_a) {
    var theme = _a.theme,
      layout = _a.layout;
    return isUndocked(layout) ? theme.radii.default : "0";
  },
  function (props) {
    return props.theme.controlBar.bgd;
  },
  function (props) {
    return props.theme.controlBar.opacity;
  },
  function (_a) {
    var theme = _a.theme,
      layout = _a.layout;
    return isUndocked(layout) ? "none" : theme.controlBar.border;
  },
  function (_a) {
    var theme = _a.theme,
      layout = _a.layout;
    return isUndocked(layout) ? theme.controlBar.shadow : "none";
  },
  function (_a) {
    var layout = _a.layout;
    return layoutMap["" + layout];
  },
  function (props) {
    return props.responsive && responsiveStylesBlock();
  },
  function (_a) {
    var layout = _a.layout;
    return isVertical(layout) && "5rem";
  },
  function (_a) {
    var layout = _a.layout;
    return !isVertical(layout) && "5rem";
  },
  baseSpacing,
  baseStyles
);
var StyledControlBarItem = styled__default["default"].div(
  templateObject_3$2 ||
    (templateObject_3$2 = __makeTemplateObject$8(
      [
        "\n  margin: ",
        ";\n  display: grid;\n  grid-template-rows: ",
        ";\n  justify-items: center;\n  align-items: center;\n  ",
        ";\n\n  .ch-control-bar-item-iconButton {\n    grid-column-start: ",
        ";\n\n    .ch-icon {\n      width: 1.5rem;\n      height: 1.5rem;\n      border-radius: 100%;\n    }\n  }\n\n  .ch-control-bar-item-caret {\n      width: 1.25rem;\n      height: 1.25rem;\n      padding: 0;\n\n      .ch-icon {\n        width: 100%;\n        height: 100%;\n      }\n\n      // setting this transform on the shape so we \n      // don't overwrite the rotate transform on the Caret\n      .Svg g {\n        transform: scale(1.333); \n        transform-origin: 50% 50%;\n      }\n    }\n\n  .ch-control-bar-popover {\n    background-color: inherit;\n    grid-column-start: ",
        ";\n    color: ",
        ";\n\n    .isOpen.ch-control-bar-item-caret {\n      color: ",
        ";\n    }\n  }\n\n  .ch-control-bar-item-label {\n    color: ",
        ";\n    grid-row-start: 2;\n    font-size: ",
        "; /* TODO: get updated font size from design */\n    padding-top: 0.25rem;\n    justify-self: center;\n    grid-column: ",
        ";\n  }\n\n  ",
        " {\n    justify-content: space-around;\n    button ~ span {\n      display: none;\n    }\n  }\n\n  ",
        " {\n    margin: ",
        ";\n    button ~ span {\n      display: none;\n    }\n  }\n",
      ],
      [
        "\n  margin: ",
        ";\n  display: grid;\n  grid-template-rows: ",
        ";\n  justify-items: center;\n  align-items: center;\n  ",
        ";\n\n  .ch-control-bar-item-iconButton {\n    grid-column-start: ",
        ";\n\n    .ch-icon {\n      width: 1.5rem;\n      height: 1.5rem;\n      border-radius: 100%;\n    }\n  }\n\n  .ch-control-bar-item-caret {\n      width: 1.25rem;\n      height: 1.25rem;\n      padding: 0;\n\n      .ch-icon {\n        width: 100%;\n        height: 100%;\n      }\n\n      // setting this transform on the shape so we \n      // don't overwrite the rotate transform on the Caret\n      .Svg g {\n        transform: scale(1.333); \n        transform-origin: 50% 50%;\n      }\n    }\n\n  .ch-control-bar-popover {\n    background-color: inherit;\n    grid-column-start: ",
        ";\n    color: ",
        ";\n\n    .isOpen.ch-control-bar-item-caret {\n      color: ",
        ";\n    }\n  }\n\n  .ch-control-bar-item-label {\n    color: ",
        ";\n    grid-row-start: 2;\n    font-size: ",
        "; /* TODO: get updated font size from design */\n    padding-top: 0.25rem;\n    justify-self: center;\n    grid-column: ",
        ";\n  }\n\n  ",
        " {\n    justify-content: space-around;\n    button ~ span {\n      display: none;\n    }\n  }\n\n  ",
        " {\n    margin: ",
        ";\n    button ~ span {\n      display: none;\n    }\n  }\n",
      ]
    )),
  function (_a) {
    var layout = _a.layout;
    return isVertical(layout) ? "0.625rem 0" : "0 0.625rem";
  },
  function (_a) {
    var showLabels = _a.showLabels;
    return showLabels ? "1.5rem 1rem" : "1.5rem";
  },
  function (_a) {
    var popOver = _a.popOver,
      layout = _a.layout,
      children = _a.children;
    return (
      "\n    " +
      ((!isVertical(layout) &&
        (popOver || children) &&
        gridTemplateColumnMap["popOver"]) ||
        "") +
      "\n    " +
      ((isVertical(layout) &&
        (popOver || children) &&
        gridTemplateColumnMap["popOver&vertical"]) ||
        "") +
      "\n  "
    );
  },
  function (_a) {
    var layout = _a.layout,
      popOver = _a.popOver,
      children = _a.children;
    return isVertical(layout) && (popOver || children) ? "2" : "1";
  },
  function (_a) {
    var layout = _a.layout,
      popOver = _a.popOver,
      children = _a.children;
    return isVertical(layout) && (popOver || children) ? "2" : "1";
  },
  function (_a) {
    var theme = _a.theme;
    return theme.controlBar.text;
  },
  function (props) {
    return props.theme.colors.primary.main;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.controlBar.text;
  },
  function (props) {
    return props.theme.fontSizes.footnote.fontSize;
  },
  function (_a) {
    var layout = _a.layout,
      popOver = _a.popOver,
      children = _a.children;
    return isVertical(layout) && (popOver || children) ? "2" : "1";
  },
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.max.sm;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.max.xs;
  },
  function (_a) {
    var layout = _a.layout;
    return isVertical(layout) ? "0.75rem 0" : "0";
  }
);
var templateObject_1$8, templateObject_2$3, templateObject_3$2;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$X =
  (undefined && undefined.__assign) ||
  function () {
    __assign$X =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$X.apply(this, arguments);
  };
var __rest$e =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ControlBar = function (_a) {
  var tag = _a.tag,
    layout = _a.layout,
    _b = _a.showLabels,
    showLabels = _b === void 0 ? false : _b,
    _c = _a.responsive,
    responsive = _c === void 0 ? true : _c,
    className = _a.className,
    children = _a.children,
    rest = __rest$e(_a, [
      "tag",
      "layout",
      "showLabels",
      "responsive",
      "className",
      "children",
    ]);
  var controlBarContext = { layout: layout, showLabels: showLabels };
  return React__default["default"].createElement(
    ControlBarContext.Provider,
    { value: controlBarContext },
    React__default["default"].createElement(
      StyledControlBar,
      __assign$X(
        { className: className || "", responsive: responsive, as: tag },
        controlBarContext,
        { "data-testid": "control-bar" },
        rest
      ),
      children
    )
  );
};

var ManagerReferenceNodeContext = React.createContext();
var ManagerReferenceNodeSetterContext = React.createContext();
function Manager(_ref) {
  var children = _ref.children;

  var _React$useState = React.useState(null),
    referenceNode = _React$useState[0],
    setReferenceNode = _React$useState[1];

  React.useEffect(
    function () {
      return function () {
        setReferenceNode(null);
      };
    },
    [setReferenceNode]
  );
  return /*#__PURE__*/ React.createElement(
    ManagerReferenceNodeContext.Provider,
    {
      value: referenceNode,
    },
    /*#__PURE__*/ React.createElement(
      ManagerReferenceNodeSetterContext.Provider,
      {
        value: setReferenceNode,
      },
      children
    )
  );
}

/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === "function") {
    for (
      var _len = arguments.length,
        args = new Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }
};
/**
 * Sets a ref using either a ref callback or a ref object
 */

var setRef = function setRef(ref, node) {
  // if its a function call it
  if (typeof ref === "function") {
    return safeInvoke(ref, node);
  } // otherwise we should treat it as a ref object
  else if (ref != null) {
    ref.current = node;
  }
};
/**
 * Simple ponyfill for Object.fromEntries
 */

var fromEntries = function fromEntries(entries) {
  return entries.reduce(function (acc, _ref) {
    var key = _ref[0],
      value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
/**
 * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
 */

var useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
    ? React.useLayoutEffect
    : React.useEffect;

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top,
  };
}

/*::

import type { Window } from '../types';

*/

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop,
  };
}

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop,
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return (isElement(element) ? element.ownerDocument : element.document)
    .documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (
    getBoundingClientRect(getDocumentElement(element)).left +
    getWindowScroll(element).scrollLeft
  );
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
    overflow = _getComputedStyle.overflow,
    overflowX = _getComputedStyle.overflowX,
    overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  var offsets = {
    x: 0,
    y: 0,
  };

  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (
      getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)
    ) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height,
  };
}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}

function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }

  return (
    // $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe: HTMLElement is a Node
    getDocumentElement(element) // fallback
  );
}

function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = getNodeName(scrollParent) === "body";
  var win = getWindow(scrollParent);
  var target = isBody
    ? [win].concat(
        win.visualViewport || [],
        isScrollParent(scrollParent) ? scrollParent : []
      )
    : scrollParent;
  var updatedList = list.concat(target);
  return isBody
    ? updatedList // $FlowFixMe: isBody tells us target will be an HTMLElement here
    : updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (
    !isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle(element).position === "fixed"
  ) {
    return null;
  }

  var offsetParent = element.offsetParent;

  if (offsetParent) {
    var html = getDocumentElement(offsetParent);

    if (
      getNodeName(offsetParent) === "body" &&
      getComputedStyle(offsetParent).position === "static" &&
      getComputedStyle(html).position !== "static"
    ) {
      return html;
    }
  }

  return offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block

function getContainingBlock(element) {
  var currentNode = getParentNode(element);

  while (
    isHTMLElement(currentNode) &&
    ["html", "body"].indexOf(getNodeName(currentNode)) < 0
  ) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.

    if (
      css.transform !== "none" ||
      css.perspective !== "none" ||
      (css.willChange && css.willChange !== "auto")
    ) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.

function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (
    offsetParent &&
    isTableElement(offsetParent) &&
    getComputedStyle(offsetParent).position === "static"
  ) {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (
    offsetParent &&
    getNodeName(offsetParent) === "body" &&
    getComputedStyle(offsetParent).position === "static"
  ) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /*#__PURE__*/ basePlacements.reduce(function (
  acc,
  placement
) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
},
[]);
var placements = /*#__PURE__*/ []
  .concat(basePlacements, [auto])
  .reduce(function (acc, placement) {
    return acc.concat([
      placement,
      placement + "-" + start,
      placement + "-" + end,
    ]);
  }, []); // modifiers that need to read the DOM

var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead"; // pure-logic modifiers

var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain"; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [
  beforeRead,
  read,
  afterRead,
  beforeMain,
  main,
  afterMain,
  beforeWrite,
  write,
  afterWrite,
];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(
      modifier.requires || [],
      modifier.requiresIfExists || []
    );
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(
      orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      })
    );
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function format(str) {
  for (
    var _len = arguments.length,
      args = new Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR =
  'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR =
  'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = [
  "name",
  "enabled",
  "phase",
  "fn",
  "effect",
  "requires",
  "options",
];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(
              format(
                INVALID_MODIFIER_ERROR,
                String(modifier.name),
                '"name"',
                '"string"',
                '"' + String(modifier.name) + '"'
              )
            );
          }

          break;

        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(
              format(
                INVALID_MODIFIER_ERROR,
                modifier.name,
                '"enabled"',
                '"boolean"',
                '"' + String(modifier.enabled) + '"'
              )
            );
          }

        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(
              format(
                INVALID_MODIFIER_ERROR,
                modifier.name,
                '"phase"',
                "either " + modifierPhases.join(", "),
                '"' + String(modifier.phase) + '"'
              )
            );
          }

          break;

        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(
              format(
                INVALID_MODIFIER_ERROR,
                modifier.name,
                '"fn"',
                '"function"',
                '"' + String(modifier.fn) + '"'
              )
            );
          }

          break;

        case "effect":
          if (typeof modifier.effect !== "function") {
            console.error(
              format(
                INVALID_MODIFIER_ERROR,
                modifier.name,
                '"effect"',
                '"function"',
                '"' + String(modifier.fn) + '"'
              )
            );
          }

          break;

        case "requires":
          if (!Array.isArray(modifier.requires)) {
            console.error(
              format(
                INVALID_MODIFIER_ERROR,
                modifier.name,
                '"requires"',
                '"array"',
                '"' + String(modifier.requires) + '"'
              )
            );
          }

          break;

        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(
              format(
                INVALID_MODIFIER_ERROR,
                modifier.name,
                '"requiresIfExists"',
                '"array"',
                '"' + String(modifier.requiresIfExists) + '"'
              )
            );
          }

          break;

        case "options":
        case "data":
          break;

        default:
          console.error(
            'PopperJS: an invalid property has been provided to the "' +
              modifier.name +
              '" modifier, valid properties are ' +
              VALID_PROPERTIES.map(function (s) {
                return '"' + s + '"';
              }).join(", ") +
              '; but "' +
              key +
              '" was provided.'
          );
      }

      modifier.requires &&
        modifier.requires.forEach(function (requirement) {
          if (
            modifiers.find(function (mod) {
              return mod.name === requirement;
            }) == null
          ) {
            console.error(
              format(
                MISSING_DEPENDENCY_ERROR,
                String(modifier.name),
                requirement,
                requirement
              )
            );
          }
        });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function getBasePlacement(placement) {
  return placement.split("-")[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing
      ? Object.assign(
          Object.assign(Object.assign({}, existing), current),
          {},
          {
            options: Object.assign(
              Object.assign({}, existing.options),
              current.options
            ),
            data: Object.assign(Object.assign({}, existing.data), current.data),
          }
        )
      : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y,
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = element.ownerDocument.body;
  var width = Math.max(
    html.scrollWidth,
    html.clientWidth,
    body ? body.scrollWidth : 0,
    body ? body.clientWidth : 0
  );
  var height = Math.max(
    html.scrollHeight,
    html.clientHeight,
    body ? body.scrollHeight : 0,
    body ? body.clientHeight : 0
  );
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === "rtl") {
    x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y,
  };
}

function contains(parent, child) {
  // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
  var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (isShadow) {
    var next = child;

    do {
      if (next && parent.isSameNode(next)) {
        return true;
      } // $FlowFixMe: need a better way to handle this...

      next = next.parentNode || next.host;
    } while (next);
  } // Give up, the result is false

  return false;
}

function rectToClientRect(rect) {
  return Object.assign(
    Object.assign({}, rect),
    {},
    {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height,
    }
  );
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport
    ? rectToClientRect(getViewportRect(element))
    : isHTMLElement(clippingParent)
    ? getInnerBoundingClientRect(clippingParent)
    : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`

function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping =
    ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement =
    canEscapeClipping && isHTMLElement(element)
      ? getOffsetParent(element)
      : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414

  return clippingParents.filter(function (clippingParent) {
    return (
      isElement(clippingParent) &&
      contains(clippingParent, clipperElement) &&
      getNodeName(clippingParent) !== "body"
    );
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents

function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents =
    boundary === "clippingParents"
      ? getClippingParents(element)
      : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = Math.max(rect.top, accRect.top);
    accRect.right = Math.min(rect.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation(placement) {
  return placement.split("-")[1];
}

function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
    element = _ref.element,
    placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height,
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height,
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY,
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY,
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y,
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";

    switch (variation) {
      case start:
        offsets[mainAxis] =
          Math.floor(offsets[mainAxis]) -
          Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] =
          Math.floor(offsets[mainAxis]) +
          Math.ceil(reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
    _options$placement = _options.placement,
    placement =
      _options$placement === void 0 ? state.placement : _options$placement,
    _options$boundary = _options.boundary,
    boundary =
      _options$boundary === void 0 ? clippingParents : _options$boundary,
    _options$rootBoundary = _options.rootBoundary,
    rootBoundary =
      _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
    _options$elementConte = _options.elementContext,
    elementContext =
      _options$elementConte === void 0 ? popper : _options$elementConte,
    _options$altBoundary = _options.altBoundary,
    altBoundary =
      _options$altBoundary === void 0 ? false : _options$altBoundary,
    _options$padding = _options.padding,
    padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(
    typeof padding !== "number"
      ? padding
      : expandToHashMap(padding, basePlacements)
  );
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(
    isElement(element)
      ? element
      : element.contextElement || getDocumentElement(state.elements.popper),
    boundary,
    rootBoundary
  );
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement: placement,
  });
  var popperClientRect = rectToClientRect(
    Object.assign(Object.assign({}, popperRect), popperOffsets)
  );
  var elementClientRect =
    elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom:
      elementClientRect.bottom -
      clippingClientRect.bottom +
      paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right:
      elementClientRect.right - clippingClientRect.right + paddingObject.right,
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

var INVALID_ELEMENT_ERROR =
  "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR =
  "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute",
};

function areValidElements() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
    _generatorOptions$def = _generatorOptions.defaultModifiers,
    defaultModifiers =
      _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
    _generatorOptions$def2 = _generatorOptions.defaultOptions,
    defaultOptions =
      _generatorOptions$def2 === void 0
        ? DEFAULT_OPTIONS
        : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign(
        Object.assign({}, DEFAULT_OPTIONS),
        defaultOptions
      ),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper,
      },
      attributes: {},
      styles: {},
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign(
          Object.assign(Object.assign({}, defaultOptions), state.options),
          options
        );
        state.scrollParents = {
          reference: isElement(reference)
            ? listScrollParents(reference)
            : reference.contextElement
            ? listScrollParents(reference.contextElement)
            : [],
          popper: listScrollParents(popper),
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(
          mergeByName([].concat(defaultModifiers, state.options.modifiers))
        ); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy(
            [].concat(orderedModifiers, state.options.modifiers),
            function (_ref) {
              var name = _ref.name;
              return name;
            }
          );
          validateModifiers(modifiers);

          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });

            if (!flipModifier) {
              console.error(
                [
                  'Popper: "auto" placements require the "flip" modifier be',
                  "present and enabled to work.",
                ].join(" ")
              );
            }
          }

          var _getComputedStyle = getComputedStyle(popper),
            marginTop = _getComputedStyle.marginTop,
            marginRight = _getComputedStyle.marginRight,
            marginBottom = _getComputedStyle.marginBottom,
            marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer

          if (
            [marginTop, marginRight, marginBottom, marginLeft].some(function (
              margin
            ) {
              return parseFloat(margin);
            })
          ) {
            console.warn(
              [
                'Popper: CSS "margin" styles cannot be used to apply padding',
                "between the popper and its reference element or boundary.",
                "To replicate margin, use the `offset` modifier, as well as",
                "the `padding` option in the `preventOverflow` and `flip`",
                "modifiers.",
              ].join(" ")
            );
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
          reference = _state$elements.reference,
          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers

        state.rects = {
          reference: getCompositeRect(
            reference,
            getOffsetParent(popper),
            state.options.strategy === "fixed"
          ),
          popper: getLayoutRect(popper),
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return (state.modifiersData[modifier.name] = Object.assign(
            {},
            modifier.data
          ));
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
            fn = _state$orderedModifie.fn,
            _state$orderedModifie2 = _state$orderedModifie.options,
            _options =
              _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
            name = _state$orderedModifie.name;

          if (typeof fn === "function") {
            state =
              fn({
                state: state,
                options: _options,
                name: name,
                instance: instance,
              }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      },
    };

    if (!areValidElements(reference, popper)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
          _ref3$options = _ref3.options,
          options = _ref3$options === void 0 ? {} : _ref3$options,
          effect = _ref3.effect;

        if (typeof effect === "function") {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options,
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true,
};

function effect(_ref) {
  var state = _ref.state,
    instance = _ref.instance,
    options = _ref.options;
  var _options$scroll = options.scroll,
    scroll = _options$scroll === void 0 ? true : _options$scroll,
    _options$resize = options.resize,
    resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(
    state.scrollParents.reference,
    state.scrollParents.popper
  );

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener("resize", instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener("resize", instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules

var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {},
  effect: effect,
  data: {},
};

function popperOffsets(_ref) {
  var state = _ref.state,
    name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement,
  });
} // eslint-disable-next-line import/no-unused-modules

var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {},
};

var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto",
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
    y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0,
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
    popperRect = _ref2.popperRect,
    placement = _ref2.placement,
    offsets = _ref2.offsets,
    position = _ref2.position,
    gpuAcceleration = _ref2.gpuAcceleration,
    adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
    x = _roundOffsets.x,
    y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */

    if (placement === top) {
      sideY = bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign(
    {
      position: position,
    },
    adaptive && unsetSides
  );

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign(
      Object.assign({}, commonStyles),
      {},
      ((_Object$assign = {}),
      (_Object$assign[sideY] = hasY ? "0" : ""),
      (_Object$assign[sideX] = hasX ? "0" : ""),
      (_Object$assign.transform =
        (win.devicePixelRatio || 1) < 2
          ? "translate(" + x + "px, " + y + "px)"
          : "translate3d(" + x + "px, " + y + "px, 0)"),
      _Object$assign)
    );
  }

  return Object.assign(
    Object.assign({}, commonStyles),
    {},
    ((_Object$assign2 = {}),
    (_Object$assign2[sideY] = hasY ? y + "px" : ""),
    (_Object$assign2[sideX] = hasX ? x + "px" : ""),
    (_Object$assign2.transform = ""),
    _Object$assign2)
  );
}

function computeStyles(_ref3) {
  var state = _ref3.state,
    options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
    gpuAcceleration =
      _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
    _options$adaptive = options.adaptive,
    adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  if (process.env.NODE_ENV !== "production") {
    var transitionProperty =
      getComputedStyle(state.elements.popper).transitionProperty || "";

    if (
      adaptive &&
      ["transform", "top", "right", "bottom", "left"].some(function (property) {
        return transitionProperty.indexOf(property) >= 0;
      })
    ) {
      console.warn(
        [
          "Popper: Detected CSS transitions on at least one of the following",
          'CSS properties: "transform", "top", "right", "bottom", "left".',
          "\n\n",
          'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
          "for smooth transitions, or remove these properties from the CSS",
          "transition declaration on the popper element if only transitioning",
          "opacity or background-color for example.",
          "\n\n",
          "We recommend using the popper element as a wrapper around an inner",
          "element that can have any CSS property transitioned for animations.",
        ].join(" ")
      );
    }
  }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign(
      Object.assign({}, state.styles.popper),
      mapToStyles(
        Object.assign(
          Object.assign({}, commonStyles),
          {},
          {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive: adaptive,
          }
        )
      )
    );
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign(
      Object.assign({}, state.styles.arrow),
      mapToStyles(
        Object.assign(
          Object.assign({}, commonStyles),
          {},
          {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
          }
        )
      )
    );
  }

  state.attributes.popper = Object.assign(
    Object.assign({}, state.attributes.popper),
    {},
    {
      "data-popper-placement": state.placement,
    }
  );
} // eslint-disable-next-line import/no-unused-modules

var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {},
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe

    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? "" : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0",
    },
    arrow: {
      position: "absolute",
    },
    reference: {},
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(
        state.styles.hasOwnProperty(name)
          ? state.styles[name]
          : initialStyles[name]
      ); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = "";
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules

var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$1,
  requires: ["computeStyles"],
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref =
      typeof offset === "function"
        ? offset(
            Object.assign(
              Object.assign({}, rects),
              {},
              {
                placement: placement,
              }
            )
          )
        : offset,
    skidding = _ref[0],
    distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0
    ? {
        x: distance,
        y: skidding,
      }
    : {
        x: skidding,
        y: distance,
      };
}

function offset(_ref2) {
  var state = _ref2.state,
    options = _ref2.options,
    name = _ref2.name;
  var _options$offset = options.offset,
    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
    x = _data$state$placement.x,
    y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules

var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset,
};

var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom",
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

var hash$1 = {
  start: "end",
  end: "start",
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash$1[matched];
  });
}

/*:: type OverflowsMap = { [ComputedPlacement]: number }; */

/*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
    placement = _options.placement,
    boundary = _options.boundary,
    rootBoundary = _options.rootBoundary,
    padding = _options.padding,
    flipVariations = _options.flipVariations,
    _options$allowedAutoP = _options.allowedAutoPlacements,
    allowedAutoPlacements =
      _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation
    ? flipVariations
      ? variationPlacements
      : variationPlacements.filter(function (placement) {
          return getVariation(placement) === variation;
        })
    : basePlacements; // $FlowFixMe

  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;

    if (process.env.NODE_ENV !== "production") {
      console.error(
        [
          "Popper: The `allowedAutoPlacements` option did not allow any",
          "placements. Ensure the `placement` option matches the variation",
          "of the allowed placements.",
          'For example, "auto" cannot be used to allow "bottom-start".',
          'Use "auto-start" instead.',
        ].join(" ")
      );
    }
  } // $FlowFixMe: Flow seems to have problems with two array unions...

  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [
    getOppositeVariationPlacement(placement),
    oppositePlacement,
    getOppositeVariationPlacement(oppositePlacement),
  ];
}

function flip(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
    specifiedFallbackPlacements = options.fallbackPlacements,
    padding = options.padding,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    _options$flipVariatio = options.flipVariations,
    flipVariations =
      _options$flipVariatio === void 0 ? true : _options$flipVariatio,
    allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements =
    specifiedFallbackPlacements ||
    (isBasePlacement || !flipVariations
      ? [getOppositePlacement(preferredPlacement)]
      : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement]
    .concat(fallbackPlacements)
    .reduce(function (acc, placement) {
      return acc.concat(
        getBasePlacement(placement) === auto
          ? computeAutoPlacement(state, {
              placement: placement,
              boundary: boundary,
              rootBoundary: rootBoundary,
              padding: padding,
              flipVariations: flipVariations,
              allowedAutoPlacements: allowedAutoPlacements,
            })
          : placement
      );
    }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding,
    });
    var mainVariationSide = isVertical
      ? isStartVariation
        ? right
        : left
      : isStartVariation
      ? bottom
      : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(
        overflow[mainVariationSide] <= 0,
        overflow[altVariationSide] <= 0
      );
    }

    if (
      checks.every(function (check) {
        return check;
      })
    ) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules

var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false,
  },
};

function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

function preventOverflow(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    padding = options.padding,
    _options$tether = options.tether,
    tether = _options$tether === void 0 ? true : _options$tether,
    _options$tetherOffset = options.tetherOffset,
    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary,
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue =
    typeof tetherOffset === "function"
      ? tetherOffset(
          Object.assign(
            Object.assign({}, state.rects),
            {},
            {
              placement: state.placement,
            }
          )
        )
      : tetherOffset;
  var data = {
    x: 0,
    y: 0,
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect =
      tether && arrowElement
        ? getLayoutRect(arrowElement)
        : {
            width: 0,
            height: 0,
          };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"]
      ? state.modifiersData["arrow#persistent"].padding
      : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement
      ? referenceRect[len] / 2 -
        additive -
        arrowLen -
        arrowPaddingMin -
        tetherOffsetValue
      : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement
      ? -referenceRect[len] / 2 +
        additive +
        arrowLen +
        arrowPaddingMax +
        tetherOffsetValue
      : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent =
      state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent
      ? mainAxis === "y"
        ? arrowOffsetParent.clientTop || 0
        : arrowOffsetParent.clientLeft || 0
      : 0;
    var offsetModifierValue = state.modifiersData.offset
      ? state.modifiersData.offset[state.placement][mainAxis]
      : 0;
    var tetherMin =
      popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = within(
      tether ? Math.min(min, tetherMin) : min,
      offset,
      tether ? Math.max(max, tetherMax) : max
    );
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === "x" ? top : left;

    var _altSide = mainAxis === "x" ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = within(_min, _offset, _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules

var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"],
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
    name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff =
    state.rects.reference[len] +
    state.rects.reference[axis] -
    popperOffsets[axis] -
    state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent
    ? axis === "y"
      ? arrowOffsetParent.clientHeight || 0
      : arrowOffsetParent.clientWidth || 0
    : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] =
    ((_state$modifiersData$ = {}),
    (_state$modifiersData$[axisProp] = offset),
    (_state$modifiersData$.centerOffset = offset - center),
    _state$modifiersData$);
}

function effect$2(_ref2) {
  var state = _ref2.state,
    options = _ref2.options,
    name = _ref2.name;
  var _options$element = options.element,
    arrowElement =
      _options$element === void 0 ? "[data-popper-arrow]" : _options$element,
    _options$padding = options.padding,
    padding = _options$padding === void 0 ? 0 : _options$padding;

  if (arrowElement == null) {
    return;
  } // CSS selector

  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    if (!isHTMLElement(arrowElement)) {
      console.error(
        [
          'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
          "To use an SVG arrow, wrap it in an HTMLElement that will be used as",
          "the arrow.",
        ].join(" ")
      );
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        [
          'Popper: "arrow" modifier\'s `element` must be a child of the popper',
          "element.",
        ].join(" ")
      );
    }

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: mergePaddingObject(
      typeof padding !== "number"
        ? padding
        : expandToHashMap(padding, basePlacements)
    ),
  };
} // eslint-disable-next-line import/no-unused-modules

var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0,
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x,
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
    name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference",
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true,
  });
  var referenceClippingOffsets = getSideOffsets(
    referenceOverflow,
    referenceRect
  );
  var popperEscapeOffsets = getSideOffsets(
    popperAltOverflow,
    popperRect,
    preventedOffsets
  );
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped,
  };
  state.attributes.popper = Object.assign(
    Object.assign({}, state.attributes.popper),
    {},
    {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped,
    }
  );
} // eslint-disable-next-line import/no-unused-modules

var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide,
};

var defaultModifiers = [
  eventListeners,
  popperOffsets$1,
  computeStyles$1,
  applyStyles$1,
  offset$1,
  flip$1,
  preventOverflow$1,
  arrow$1,
  hide$1,
];
var createPopper = /*#__PURE__*/ popperGenerator({
  defaultModifiers: defaultModifiers,
}); // eslint-disable-next-line import/no-unused-modules

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== "undefined";
var hasMap = typeof Map === "function";
var hasSet = typeof Set === "function";
var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0; ) {
      if (
        (keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") &&
        a.$$typeof
      ) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

var reactFastCompare = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || "").match(/stack|recursion/i)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn("react-fast-compare cannot handle circular refs");
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};

var EMPTY_MODIFIERS = [];
var usePopper = function usePopper(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }

  var prevOptions = React.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS,
  };

  var _React$useState = React.useState({
      styles: {
        popper: {
          position: optionsWithDefaults.strategy,
          left: "0",
          top: "0",
        },
      },
      attributes: {},
    }),
    state = _React$useState[0],
    setState = _React$useState[1];

  var updateStateModifier = React.useMemo(function () {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn(_ref) {
        var state = _ref.state;
        var elements = Object.keys(state.elements);
        setState({
          styles: fromEntries(
            elements.map(function (element) {
              return [element, state.styles[element] || {}];
            })
          ),
          attributes: fromEntries(
            elements.map(function (element) {
              return [element, state.attributes[element]];
            })
          ),
        });
      },
      requires: ["computeStyles"],
    };
  }, []);
  var popperOptions = React.useMemo(
    function () {
      var newOptions = {
        onFirstUpdate: optionsWithDefaults.onFirstUpdate,
        placement: optionsWithDefaults.placement,
        strategy: optionsWithDefaults.strategy,
        modifiers: [].concat(optionsWithDefaults.modifiers, [
          updateStateModifier,
          {
            name: "applyStyles",
            enabled: false,
          },
        ]),
      };

      if (reactFastCompare(prevOptions.current, newOptions)) {
        return prevOptions.current || newOptions;
      } else {
        prevOptions.current = newOptions;
        return newOptions;
      }
    },
    [
      optionsWithDefaults.onFirstUpdate,
      optionsWithDefaults.placement,
      optionsWithDefaults.strategy,
      optionsWithDefaults.modifiers,
      updateStateModifier,
    ]
  );
  var popperInstanceRef = React.useRef();
  useIsomorphicLayoutEffect(
    function () {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.setOptions(popperOptions);
      }
    },
    [popperOptions]
  );
  useIsomorphicLayoutEffect(
    function () {
      if (referenceElement == null || popperElement == null) {
        return;
      }

      var createPopper$1 = options.createPopper || createPopper;
      var popperInstance = createPopper$1(
        referenceElement,
        popperElement,
        popperOptions
      );
      popperInstanceRef.current = popperInstance;
      return function () {
        popperInstance.destroy();
        popperInstanceRef.current = null;
      };
    },
    [referenceElement, popperElement, options.createPopper]
  );
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current
      ? popperInstanceRef.current.forceUpdate
      : null,
  };
};

var NOOP = function NOOP() {
  return void 0;
};

var NOOP_PROMISE = function NOOP_PROMISE() {
  return Promise.resolve(null);
};

var EMPTY_MODIFIERS$1 = [];
function Popper(_ref) {
  var _ref$placement = _ref.placement,
    placement = _ref$placement === void 0 ? "bottom" : _ref$placement,
    _ref$strategy = _ref.strategy,
    strategy = _ref$strategy === void 0 ? "absolute" : _ref$strategy,
    _ref$modifiers = _ref.modifiers,
    modifiers = _ref$modifiers === void 0 ? EMPTY_MODIFIERS$1 : _ref$modifiers,
    referenceElement = _ref.referenceElement,
    onFirstUpdate = _ref.onFirstUpdate,
    innerRef = _ref.innerRef,
    children = _ref.children;
  var referenceNode = React.useContext(ManagerReferenceNodeContext);

  var _React$useState = React.useState(null),
    popperElement = _React$useState[0],
    setPopperElement = _React$useState[1];

  var _React$useState2 = React.useState(null),
    arrowElement = _React$useState2[0],
    setArrowElement = _React$useState2[1];

  React.useEffect(
    function () {
      return setRef(innerRef, popperElement);
    },
    [innerRef, popperElement]
  );
  var options = React.useMemo(
    function () {
      return {
        placement: placement,
        strategy: strategy,
        onFirstUpdate: onFirstUpdate,
        modifiers: [].concat(modifiers, [
          {
            name: "arrow",
            enabled: arrowElement != null,
            options: {
              element: arrowElement,
            },
          },
        ]),
      };
    },
    [placement, strategy, onFirstUpdate, modifiers, arrowElement]
  );

  var _usePopper = usePopper(
      referenceElement || referenceNode,
      popperElement,
      options
    ),
    state = _usePopper.state,
    styles = _usePopper.styles,
    forceUpdate = _usePopper.forceUpdate,
    update = _usePopper.update;

  var childrenProps = React.useMemo(
    function () {
      return {
        ref: setPopperElement,
        style: styles.popper,
        placement: state ? state.placement : placement,
        hasPopperEscaped:
          state && state.modifiersData.hide
            ? state.modifiersData.hide.hasPopperEscaped
            : null,
        isReferenceHidden:
          state && state.modifiersData.hide
            ? state.modifiersData.hide.isReferenceHidden
            : null,
        arrowProps: {
          style: styles.arrow,
          ref: setArrowElement,
        },
        forceUpdate: forceUpdate || NOOP,
        update: update || NOOP_PROMISE,
      };
    },
    [
      setPopperElement,
      setArrowElement,
      placement,
      state,
      styles,
      update,
      forceUpdate,
    ]
  );
  return unwrapArray(children)(childrenProps);
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== "production";

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message =
      "Warning: " +
      format.replace(/%s/g, function () {
        return args[argIndex++];
      });
    if (typeof console !== "undefined") {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        "`warning(condition, format, ...args)` requires a warning " +
          "message argument"
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

var warning_1 = warning;

function Reference(_ref) {
  var children = _ref.children,
    innerRef = _ref.innerRef;
  var setReferenceNode = React.useContext(ManagerReferenceNodeSetterContext);
  var refHandler = React.useCallback(
    function (node) {
      setRef(innerRef, node);
      safeInvoke(setReferenceNode, node);
    },
    [innerRef, setReferenceNode]
  ); // ran on unmount

  React.useEffect(function () {
    return function () {
      return setRef(innerRef, null);
    };
  });
  React.useEffect(
    function () {
      warning_1(
        Boolean(setReferenceNode),
        "`Reference` should not be used outside of a `Manager` component."
      );
    },
    [setReferenceNode]
  );
  return unwrapArray(children)({
    ref: refHandler,
  });
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$9 =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledPopOverMenu = styled__default["default"].ul(
  templateObject_1$9 ||
    (templateObject_1$9 = __makeTemplateObject$9(
      [
        "\n  width: fit-content;\n  max-width: 22rem;\n  background-color: ",
        ";\n  border: ",
        ";\n  margin: 0;\n  border-radius: 0.25rem;\n  backdrop-filter: blur(1rem);\n  list-style: none;\n  padding: 0.5rem 0;\n  box-shadow: ",
        ";\n  z-index: ",
        ";\n  display: table;\n  overflow: inherit;\n",
      ],
      [
        "\n  width: fit-content;\n  max-width: 22rem;\n  background-color: ",
        ";\n  border: ",
        ";\n  margin: 0;\n  border-radius: 0.25rem;\n  backdrop-filter: blur(1rem);\n  list-style: none;\n  padding: 0.5rem 0;\n  box-shadow: ",
        ";\n  z-index: ",
        ";\n  display: table;\n  overflow: inherit;\n",
      ]
    )),
  function (props) {
    return props.theme.popOver.menuBgd;
  },
  function (props) {
    return props.theme.popOver.menuBorder;
  },
  function (props) {
    return props.theme.popOver.shadow;
  },
  function (props) {
    return props.theme.zIndex.popOver;
  }
);
var StyledPopOverToggle = styled__default["default"].button(
  templateObject_2$4 ||
    (templateObject_2$4 = __makeTemplateObject$9(
      [
        "\n  background-color: transparent;\n  padding: 0;\n  border: none;\n  cursor: pointer;\n  &:focus {\n    outline: 0;\n  }\n",
      ],
      [
        "\n  background-color: transparent;\n  padding: 0;\n  border: none;\n  cursor: pointer;\n  &:focus {\n    outline: 0;\n  }\n",
      ]
    ))
);
var StyledPopOverItem = styled__default["default"].li(
  templateObject_3$3 ||
    (templateObject_3$3 = __makeTemplateObject$9(
      [
        "\n  height: 2rem;\n  position: relative;\n\n  button,\n  a {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    border: none;\n    cursor: pointer;\n    background-color: ",
        ";\n    color: ",
        ";\n    line-height: ",
        ";\n    font-size: ",
        ";\n    padding: 0 2.5rem;\n    text-decoration: none;\n    outline: 0;\n\n    &:hover,\n    &:focus {\n      background-color: ",
        ";\n      color: ",
        ";\n      outline: 0;\n    }\n  }\n\n  a {\n    width: unset;\n  }\n\n  .ch-content > * {\n    ",
        ";\n  }\n\n  .ch-check {\n    position: absolute;\n    left: 0.5rem;\n    width: 1.5rem;\n    height: 1.5rem;\n    top: 0.33rem;\n  }\n\n  &:hover .ch-check g,\n  &:focus .ch-check g {\n    fill: ",
        ";\n  }\n",
      ],
      [
        "\n  height: 2rem;\n  position: relative;\n\n  button,\n  a {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    border: none;\n    cursor: pointer;\n    background-color: ",
        ";\n    color: ",
        ";\n    line-height: ",
        ";\n    font-size: ",
        ";\n    padding: 0 2.5rem;\n    text-decoration: none;\n    outline: 0;\n\n    &:hover,\n    &:focus {\n      background-color: ",
        ";\n      color: ",
        ";\n      outline: 0;\n    }\n  }\n\n  a {\n    width: unset;\n  }\n\n  .ch-content > * {\n    ",
        ";\n  }\n\n  .ch-check {\n    position: absolute;\n    left: 0.5rem;\n    width: 1.5rem;\n    height: 1.5rem;\n    top: 0.33rem;\n  }\n\n  &:hover .ch-check g,\n  &:focus .ch-check g {\n    fill: ",
        ";\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.popOver.itemBgd;
  },
  function (props) {
    return props.theme.popOver.itemText;
  },
  function (props) {
    return props.theme.fontSizes.text.lineHeight;
  },
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.popOver.active.itemBgd;
  },
  function (props) {
    return props.theme.popOver.active.itemText;
  },
  ellipsis,
  function (props) {
    return props.theme.popOver.active.itemText;
  }
);
var StyledSubMenu = styled__default["default"](StyledPopOverItem)(
  templateObject_4$1 ||
    (templateObject_4$1 = __makeTemplateObject$9(
      [
        "\n  > span {\n    width: 100%;\n    height: 100%;\n    display: block;\n    height: 2rem;\n  }\n\n  > button {\n    position: relative;\n  }\n\n  .ch-caret {\n    position: absolute;\n    width: 1.5rem;\n    height: 1.5rem;\n    right: 0;\n    color: inherit;\n    fill: inherit;\n  }\n",
      ],
      [
        "\n  > span {\n    width: 100%;\n    height: 100%;\n    display: block;\n    height: 2rem;\n  }\n\n  > button {\n    position: relative;\n  }\n\n  .ch-caret {\n    position: absolute;\n    width: 1.5rem;\n    height: 1.5rem;\n    right: 0;\n    color: inherit;\n    fill: inherit;\n  }\n",
      ]
    ))
);
var StyledPopOverHeader = styled__default["default"].header(
  templateObject_5 ||
    (templateObject_5 = __makeTemplateObject$9(
      [
        "\n  border-bottom: 0.0625rem solid ",
        ";\n  margin-bottom: 0.75rem;\n\n  img {\n    width: 100%;\n    display: inline-block;\n    margin-top: -0.5rem;\n    border-radius: 0.25rem 0.25rem 0 0;\n  }\n\n  img + .ch-title {\n    margin-top: 0.75rem;\n  }\n\n  .ch-title {\n    ",
        ";\n    padding: 0 2.5rem;\n    margin-top: 0.5rem;\n    margin-bottom: 0;\n    color: ",
        ";\n    font-size: 1.18125rem;\n    line-height: ",
        ";\n  }\n\n  .ch-subtitle {\n    ",
        ";\n    padding: 0 2.5rem;\n    color: #616672;\n    font-size: ",
        ";\n    line-height: ",
        ";\n    line-height: 1.43;\n    margin: 0 0 1rem;\n  }\n",
      ],
      [
        "\n  border-bottom: 0.0625rem solid ",
        ";\n  margin-bottom: 0.75rem;\n\n  img {\n    width: 100%;\n    display: inline-block;\n    margin-top: -0.5rem;\n    border-radius: 0.25rem 0.25rem 0 0;\n  }\n\n  img + .ch-title {\n    margin-top: 0.75rem;\n  }\n\n  .ch-title {\n    ",
        ";\n    padding: 0 2.5rem;\n    margin-top: 0.5rem;\n    margin-bottom: 0;\n    color: ",
        ";\n    font-size: 1.18125rem;\n    line-height: ",
        ";\n  }\n\n  .ch-subtitle {\n    ",
        ";\n    padding: 0 2.5rem;\n    color: #616672;\n    font-size: ",
        ";\n    line-height: ",
        ";\n    line-height: 1.43;\n    margin: 0 0 1rem;\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.popOver.separator;
  },
  ellipsis,
  function (props) {
    return props.theme.popOver.titleText;
  },
  function (props) {
    return props.theme.fontSizes.text.lineHeight;
  },
  ellipsis,
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.fontSizes.text.lineHeight;
  }
);
var StyledPopOverSeparator = styled__default["default"].li(
  templateObject_6 ||
    (templateObject_6 = __makeTemplateObject$9(
      [
        "\n  margin: 0;\n  border-width: 0.0625rem 0 0 0;\n  border-style: solid;\n  border-color: ",
        ";\n  margin-bottom: 0.75rem;\n  opacity: 0.8;\n",
      ],
      [
        "\n  margin: 0;\n  border-width: 0.0625rem 0 0 0;\n  border-style: solid;\n  border-color: ",
        ";\n  margin-bottom: 0.75rem;\n  opacity: 0.8;\n",
      ]
    )),
  function (props) {
    return props.theme.popOver.separator;
  }
);
var templateObject_1$9,
  templateObject_2$4,
  templateObject_3$3,
  templateObject_4$1,
  templateObject_5,
  templateObject_6;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var KEY_CODES = {
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
};
var VIDEO_INPUT_QUALITY = {
  "360p": "360p (nHD) @ 15 fps (600 Kbps max)",
  "540p": "540p (qHD) @ 15 fps (1.4 Mbps max)",
  "720p": "720p (HD) @ 15 fps (1.4 Mbps max)",
};

function createCommonjsModule(fn, basedir, module) {
  return (
    (module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(
          path,
          base === undefined || base === null ? module.path : base
        );
      },
    }),
    fn(module, module.exports),
    module.exports
  );
}

function commonjsRequire() {
  throw new Error(
    "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
  );
}

var classnames = createCommonjsModule(function (module) {
  /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
  /* global define */

  (function () {
    var hasOwn = {}.hasOwnProperty;

    function classNames() {
      var classes = [];

      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;

        var argType = typeof arg;

        if (argType === "string" || argType === "number") {
          classes.push(arg);
        } else if (Array.isArray(arg) && arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        } else if (argType === "object") {
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
          }
        }
      }

      return classes.join(" ");
    }

    if (module.exports) {
      classNames.default = classNames;
      module.exports = classNames;
    } else {
      window.classNames = classNames;
    }
  })();
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useClickOutside(ref, onClickOutside) {
  var isOutside = function (e) {
    return !!ref.current && !ref.current.contains(e.target);
  };
  var onMouseDown = function (e) {
    if (isOutside(e)) {
      onClickOutside(e);
    }
  };
  React.useEffect(function () {
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("touchstart", onMouseDown);
    return function () {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("touchstart", onMouseDown);
    };
  }),
    [onClickOutside];
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useTabOutside(ref, onTabOutside) {
  var isOutside = function () {
    return !!ref.current && !ref.current.contains(document.activeElement);
  };
  var keyUp = function (e) {
    if (e.keyCode === 9 && isOutside()) {
      return onTabOutside(e);
    }
  };
  React.useEffect(function () {
    document.addEventListener("keyup", keyUp);
    return function () {
      document.removeEventListener("keyup", keyUp);
    };
  }),
    [onTabOutside];
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$Y =
  (undefined && undefined.__assign) ||
  function () {
    __assign$Y =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$Y.apply(this, arguments);
  };
var __rest$f =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var getFocusableElements = function (node) {
  return node.querySelectorAll("button, [href]");
};
var PopOver = function (_a) {
  var renderButton = _a.renderButton,
    renderButtonWrapper = _a.renderButtonWrapper,
    children = _a.children,
    _b = _a.isSubMenu,
    isSubMenu = _b === void 0 ? false : _b,
    _c = _a.placement,
    placement = _c === void 0 ? "bottom-start" : _c,
    a11yLabel = _a.a11yLabel,
    className = _a.className,
    rest = __rest$f(_a, [
      "renderButton",
      "renderButtonWrapper",
      "children",
      "isSubMenu",
      "placement",
      "a11yLabel",
      "className",
    ]);
  var menuRef = React.createRef();
  var _d = React.useState(false),
    isOpen = _d[0],
    setIsOpen = _d[1];
  React.useEffect(
    function () {
      if (isOpen && !!menuRef.current) {
        var nodes = getFocusableElements(menuRef.current);
        !!nodes && nodes[0].focus();
      }
    },
    [isOpen]
  );
  var move = function (direction) {
    var node = menuRef.current;
    if (isSubMenu) {
      // the parent menu can access
      // child nodes and manage focused elements
      return;
    }
    if (!!node) {
      var nodes = getFocusableElements(node);
      var currentElement = document.activeElement;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] === currentElement) {
          if (direction === "down" && i !== nodes.length - 1) {
            return nodes[i + 1].focus();
          }
          if (direction === "up" && i > 0) {
            return nodes[i - 1].focus();
          }
          break;
        }
      }
    }
  };
  var closePopover = function (e) {
    var isSubMenuButton = e.target.closest("[data-menu='submenu']");
    return !isSubMenuButton ? setIsOpen(false) : false;
  };
  var handleKeyUp = function (e) {
    switch (e.keyCode) {
      case KEY_CODES.ESCAPE:
        return setIsOpen(false);
      case KEY_CODES.ARROW_UP:
        return move("up");
      case KEY_CODES.ARROW_DOWN:
        return move("down");
    }
  };
  useClickOutside(menuRef, function () {
    return setIsOpen(false);
  });
  useTabOutside(menuRef, function () {
    return setIsOpen(false);
  });
  return React__default["default"].createElement(
    "span",
    { ref: menuRef, onKeyDown: handleKeyUp, "data-testid": "popover" },
    React__default["default"].createElement(
      Manager,
      null,
      React__default["default"].createElement(Reference, null, function (_a) {
        var ref = _a.ref;
        var props = {
          ref: ref,
          className: classnames(className, "ch-popover-toggle"),
          onClick: function () {
            return setIsOpen(!isOpen);
          },
          "data-menu": isSubMenu ? "submenu" : null,
          "aria-label": a11yLabel,
          "aria-haspopup": true,
          "aria-expanded": isOpen,
          "data-testid": "popover-toggle",
        };
        if (renderButton) {
          return React__default["default"].createElement(
            StyledPopOverToggle,
            __assign$Y({}, props),
            renderButton(isOpen)
          );
        }
        if (renderButtonWrapper) {
          return renderButtonWrapper(isOpen, props);
        }
        return null;
      }),
      isOpen &&
        React__default["default"].createElement(
          Popper,
          __assign$Y(
            {
              placement: placement,
              modifiers: [{ name: "offset", options: { offset: [-8, 0] } }],
            },
            rest
          ),
          function (_a) {
            var ref = _a.ref,
              style = _a.style,
              placement = _a.placement;
            return React__default["default"].createElement(
              StyledPopOverMenu,
              {
                "data-placement": placement,
                onClick: function (e) {
                  return closePopover(e);
                },
                ref: ref,
                style: style,
                "data-testid": "menu",
              },
              children
            );
          }
        )
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$Z =
  (undefined && undefined.__assign) ||
  function () {
    __assign$Z =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$Z.apply(this, arguments);
  };
var __rest$g =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var PopOverItem = function (_a) {
  var _b = _a.as,
    as = _b === void 0 ? "button" : _b,
    children = _a.children,
    checked = _a.checked,
    rest = __rest$g(_a, ["as", "children", "checked"]);
  var Tag = as;
  return React__default["default"].createElement(
    StyledPopOverItem,
    { "data-testid": "popover-item" },
    checked &&
      React__default["default"].createElement(Check, {
        className: "ch-check",
        "data-testid": "popover-check",
      }),
    React__default["default"].createElement(
      Tag,
      __assign$Z({ className: "ch-content" }, rest),
      children
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$_ =
  (undefined && undefined.__assign) ||
  function () {
    __assign$_ =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$_.apply(this, arguments);
  };
var __rest$h =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ControlBarButton = function (_a) {
  var icon = _a.icon,
    onClick = _a.onClick,
    label = _a.label,
    _b = _a.isSelected,
    isSelected = _b === void 0 ? false : _b,
    _c = _a.popOver,
    popOver = _c === void 0 ? null : _c,
    popOverPlacement = _a.popOverPlacement,
    popOverLabel = _a.popOverLabel,
    children = _a.children,
    rest = __rest$h(_a, [
      "icon",
      "onClick",
      "label",
      "isSelected",
      "popOver",
      "popOverPlacement",
      "popOverLabel",
      "children",
    ]);
  var context = useControlBarContext();
  var renderPopOver = function () {
    return React__default["default"].createElement(
      PopOver,
      {
        renderButtonWrapper: function (isActive, props) {
          return React__default["default"].createElement(
            IconButton,
            __assign$_({}, props, {
              icon: React__default["default"].createElement(Caret, {
                direction: isVertical(context.layout) ? "right" : "up",
                "data-testid": "control-bar-item-caret",
              }),
              label: popOverLabel || label,
              selected: isActive,
              className:
                "ch-control-bar-item-caret " + (isActive ? "isOpen" : ""),
            })
          );
        },
        a11yLabel: label,
        className: "ch-control-bar-popover",
        placement: popOverPlacement,
      },
      popOver === null || popOver === void 0
        ? void 0
        : popOver.map(function (option, index) {
            return React__default["default"].createElement(
              PopOverItem,
              __assign$_({}, option, { key: index })
            );
          }),
      children
    );
  };
  return React__default["default"].createElement(
    StyledControlBarItem,
    __assign$_(
      { isSelected: isSelected, "data-testid": "control-bar-item" },
      rest,
      context,
      { popOver: popOver }
    ),
    React__default["default"].createElement(IconButton, {
      onClick: onClick,
      label: label,
      icon: icon,
      className: "ch-control-bar-item-iconButton",
      selected: isSelected,
    }),
    (popOver || children) && renderPopOver(),
    context.showLabels &&
      React__default["default"].createElement(
        "div",
        { className: "ch-control-bar-item-label" },
        label
      )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$a =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var fillSpace = styled.css(
  templateObject_1$a ||
    (templateObject_1$a = __makeTemplateObject$a(
      ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n"],
      ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n"]
    ))
);
var fillSpaceCentered = styled.css(
  templateObject_2$5 ||
    (templateObject_2$5 = __makeTemplateObject$a(
      ["\n  ", ";\n  align-items: center;\n  justify-content: center;\n"],
      ["\n  ", ";\n  align-items: center;\n  justify-content: center;\n"]
    )),
  fillSpace
);
var equalColumns = styled.css(
  templateObject_3$4 ||
    (templateObject_3$4 = __makeTemplateObject$a(
      [
        "\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  align-items: stretch;\n\n  > * {\n    flex-grow: 1;\n    flex-basis: 50%;\n  }\n",
      ],
      [
        "\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  align-items: stretch;\n\n  > * {\n    flex-grow: 1;\n    flex-basis: 50%;\n  }\n",
      ]
    ))
);
var stack = styled.css(
  templateObject_4$2 ||
    (templateObject_4$2 = __makeTemplateObject$a(
      [
        "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  > * {\n    width: 100%;\n  }\n",
      ],
      [
        "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  > * {\n    width: 100%;\n  }\n",
      ]
    ))
);
var layoutMap$1 = {
  "fill-space": fillSpace,
  "fill-space-centered": fillSpaceCentered,
  "equal-columns": equalColumns,
  stack: stack,
};
var StyledFlex = styled__default["default"].div(
  templateObject_5$1 ||
    (templateObject_5$1 = __makeTemplateObject$a(
      [
        "\n  align-items: ",
        ";\n  display: ",
        ";\n  flex: ",
        ";\n  flex-basis: ",
        ";\n  flex-direction: ",
        ";\n  flex-grow: ",
        ";\n  flex-shrink: ",
        ";\n  flex-wrap: ",
        ";\n  justify-content: ",
        ";\n\n  // layout variants\n  ",
        "\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  align-items: ",
        ";\n  display: ",
        ";\n  flex: ",
        ";\n  flex-basis: ",
        ";\n  flex-direction: ",
        ";\n  flex-grow: ",
        ";\n  flex-shrink: ",
        ";\n  flex-wrap: ",
        ";\n  justify-content: ",
        ";\n\n  // layout variants\n  ",
        "\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.alignItems;
  },
  function (props) {
    return props.container ? "flex" : "block";
  },
  function (props) {
    return props.flex || "";
  },
  function (props) {
    return props.flexBasis;
  },
  function (props) {
    return props.flexDirection;
  },
  function (props) {
    return props.flexGrow || "";
  },
  function (props) {
    return props.flexShrink;
  },
  function (props) {
    return props.flexWrap;
  },
  function (props) {
    return props.justifyContent;
  },
  function (props) {
    return !!props.layout && layoutMap$1[props.layout];
  },
  baseSpacing,
  baseStyles
);
var templateObject_1$a,
  templateObject_2$5,
  templateObject_3$4,
  templateObject_4$2,
  templateObject_5$1;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$$ =
  (undefined && undefined.__assign) ||
  function () {
    __assign$$ =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$$.apply(this, arguments);
  };
var __rest$i =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Flex = function (_a) {
  var children = _a.children,
    className = _a.className,
    tag = _a.tag,
    _b = _a.alignItems,
    alignItems = _b === void 0 ? "stretch" : _b,
    _c = _a.container,
    container = _c === void 0 ? false : _c,
    _d = _a.flexBasis,
    flexBasis = _d === void 0 ? "auto" : _d,
    _e = _a.flexDirection,
    flexDirection = _e === void 0 ? "row" : _e,
    _f = _a.flexShrink,
    flexShrink = _f === void 0 ? 1 : _f,
    _g = _a.flexWrap,
    flexWrap = _g === void 0 ? "nowrap" : _g,
    _h = _a.justifyContent,
    justifyContent = _h === void 0 ? "flex-start" : _h,
    props = __rest$i(_a, [
      "children",
      "className",
      "tag",
      "alignItems",
      "container",
      "flexBasis",
      "flexDirection",
      "flexShrink",
      "flexWrap",
      "justifyContent",
    ]);
  return React__default["default"].createElement(
    StyledFlex,
    __assign$$(
      {
        alignItems: alignItems,
        container: container,
        flexBasis: flexBasis,
        flexDirection: flexDirection,
        flexShrink: flexShrink,
        flexWrap: flexWrap,
        justifyContent: justifyContent,
        as: tag,
        "data-testid": "flex",
        className: className || "",
      },
      props
    ),
    children
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$b =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledLabel = styled__default["default"].label(
  templateObject_1$b ||
    (templateObject_1$b = __makeTemplateObject$b(
      [
        "\n  color: ",
        ";\n  font-size: ",
        ";\n  line-height: ",
        ";\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  color: ",
        ";\n  font-size: ",
        ";\n  line-height: ",
        ";\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.inputs.fontColor;
  },
  function (props) {
    return props.theme.fontSizes.label.fontSize;
  },
  function (props) {
    return props.theme.fontSizes.label.lineHeight;
  },
  baseSpacing,
  baseStyles
);
var templateObject_1$b;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$10 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$10 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$10.apply(this, arguments);
  };
var __rest$j =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Label = React.forwardRef(function (props, ref) {
  var className = props.className,
    tag = props.tag,
    rest = __rest$j(props, ["className", "tag"]);
  return React__default["default"].createElement(
    StyledLabel,
    __assign$10(
      { as: tag, "data-testid": "label", className: className || "" },
      rest
    ),
    props.children
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$c =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var stack$1 = styled.css(
  templateObject_1$c ||
    (templateObject_1$c = __makeTemplateObject$c(
      [
        "\n  &.ch-form-field-input,\n  &.ch-form-field-select,\n  &.ch-form-field-textarea {\n    display: flex;\n    flex-direction: column;\n\n    label {\n      display: block;\n      margin-bottom: 0.5rem;\n    }\n\n    input,\n    select {\n      width: 100%;\n    }\n  }\n\n  &.ch-form-field-checkbox {\n    display: grid;\n    grid-template-columns: 1.5rem 1fr;\n    grid-template-rows: auto;\n    gap: 0px 0.5rem;\n\n    .ch-checkbox {\n      grid-column: 1;\n      grid-row: 1;\n    }\n\n    .ch-checkbox-label {\n      line-height: 1.3;\n      grid-column: 2;\n    }\n\n    .ch-help-text {\n      grid-row: 2;\n      grid-column: 1/3;\n    }\n  }\n\n  &.ch-form-field-radiogroup {\n    flex-direction: column;\n\n    .ch-radio-wrapper {\n      display: block;\n      margin-bottom: 0.5rem;\n      padding-left: 0.125rem;\n      display: grid;\n      grid-template-columns: 1.5rem 1fr;\n      grid-template-rows: auto;\n\n      align-items: center;\n    }\n\n    .ch-radio-label {\n      margin-left: 1rem;\n      position: relative;\n      bottom: -0.5px;\n    }\n  }\n",
      ],
      [
        "\n  &.ch-form-field-input,\n  &.ch-form-field-select,\n  &.ch-form-field-textarea {\n    display: flex;\n    flex-direction: column;\n\n    label {\n      display: block;\n      margin-bottom: 0.5rem;\n    }\n\n    input,\n    select {\n      width: 100%;\n    }\n  }\n\n  &.ch-form-field-checkbox {\n    display: grid;\n    grid-template-columns: 1.5rem 1fr;\n    grid-template-rows: auto;\n    gap: 0px 0.5rem;\n\n    .ch-checkbox {\n      grid-column: 1;\n      grid-row: 1;\n    }\n\n    .ch-checkbox-label {\n      line-height: 1.3;\n      grid-column: 2;\n    }\n\n    .ch-help-text {\n      grid-row: 2;\n      grid-column: 1/3;\n    }\n  }\n\n  &.ch-form-field-radiogroup {\n    flex-direction: column;\n\n    .ch-radio-wrapper {\n      display: block;\n      margin-bottom: 0.5rem;\n      padding-left: 0.125rem;\n      display: grid;\n      grid-template-columns: 1.5rem 1fr;\n      grid-template-rows: auto;\n\n      align-items: center;\n    }\n\n    .ch-radio-label {\n      margin-left: 1rem;\n      position: relative;\n      bottom: -0.5px;\n    }\n  }\n",
      ]
    ))
);
var horizontal = styled.css(
  templateObject_2$6 ||
    (templateObject_2$6 = __makeTemplateObject$c(
      [
        "\n  @media (max-width: 599px) {\n    ",
        ";\n  }\n\n  @media (min-width: 600px) {\n    &.ch-form-field-input,\n    &.ch-form-field-select,\n    &.ch-form-field-textarea,\n    &.ch-form-field-checkbox {\n      display: grid;\n      grid-template-columns: 30% 1fr;\n      grid-template-rows: auto;\n      gap: 0px 0.5rem;\n      align-items: center;\n\n      input {\n        width: 100%;\n      }\n\n      .ch-help-text {\n        grid-column: 2;\n      }\n    }\n\n    &.ch-form-field-radiogroup {\n      flex-wrap: wrap;\n\n      fieldset {\n        width: 100%;\n      }\n\n      .ch-radio-wrapper {\n        display: grid;\n        grid-template-columns: 30% 1fr;\n        grid-template-rows: auto;\n        gap: 0px 0.5rem;\n        align-items: center;\n        margin-bottom: 0.5rem;\n      }\n\n      .ch-radio {\n        grid-column: 2;\n        grid-row: 1;\n        margin-top: -4px;\n      }\n\n      .ch-radio-label {\n        grid-column: 1;\n        padding-right: 1rem;\n        margin-left: 0;\n      }\n\n      .ch-help-text {\n        width: 100%;\n      }\n    }\n  }\n",
      ],
      [
        "\n  @media (max-width: 599px) {\n    ",
        ";\n  }\n\n  @media (min-width: 600px) {\n    &.ch-form-field-input,\n    &.ch-form-field-select,\n    &.ch-form-field-textarea,\n    &.ch-form-field-checkbox {\n      display: grid;\n      grid-template-columns: 30% 1fr;\n      grid-template-rows: auto;\n      gap: 0px 0.5rem;\n      align-items: center;\n\n      input {\n        width: 100%;\n      }\n\n      .ch-help-text {\n        grid-column: 2;\n      }\n    }\n\n    &.ch-form-field-radiogroup {\n      flex-wrap: wrap;\n\n      fieldset {\n        width: 100%;\n      }\n\n      .ch-radio-wrapper {\n        display: grid;\n        grid-template-columns: 30% 1fr;\n        grid-template-rows: auto;\n        gap: 0px 0.5rem;\n        align-items: center;\n        margin-bottom: 0.5rem;\n      }\n\n      .ch-radio {\n        grid-column: 2;\n        grid-row: 1;\n        margin-top: -4px;\n      }\n\n      .ch-radio-label {\n        grid-column: 1;\n        padding-right: 1rem;\n        margin-left: 0;\n      }\n\n      .ch-help-text {\n        width: 100%;\n      }\n    }\n  }\n",
      ]
    )),
  stack$1
);
var inputOnly = styled.css(
  templateObject_3$5 ||
    (templateObject_3$5 = __makeTemplateObject$c(
      [
        "\n  &.ch-form-field-input,\n  &.ch-form-field-select,\n  &.ch-form-field-textarea {\n    display: flex;\n    flex-direction: column;\n\n    input {\n      width: 100%;\n    }\n  }\n\n  &.ch-form-field-checkbox {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n\n    .ch-checkbox {\n      order: 1;\n    }\n\n    .ch-checkbox-label {\n      order: 2;\n      padding-left: 1rem;\n    }\n\n    .ch-help-text {\n      width: 100%;\n      order: 3;\n    }\n  }\n\n  &.ch-form-field-radiogroup {\n    flex-direction: column;\n\n    .ch-radio-wrapper {\n      display: block;\n      margin-bottom: 0.5rem;\n    }\n\n    .ch-radio-label {\n      margin-left: 1rem;\n    }\n  }\n",
      ],
      [
        "\n  &.ch-form-field-input,\n  &.ch-form-field-select,\n  &.ch-form-field-textarea {\n    display: flex;\n    flex-direction: column;\n\n    input {\n      width: 100%;\n    }\n  }\n\n  &.ch-form-field-checkbox {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n\n    .ch-checkbox {\n      order: 1;\n    }\n\n    .ch-checkbox-label {\n      order: 2;\n      padding-left: 1rem;\n    }\n\n    .ch-help-text {\n      width: 100%;\n      order: 3;\n    }\n  }\n\n  &.ch-form-field-radiogroup {\n    flex-direction: column;\n\n    .ch-radio-wrapper {\n      display: block;\n      margin-bottom: 0.5rem;\n    }\n\n    .ch-radio-label {\n      margin-left: 1rem;\n    }\n  }\n",
      ]
    ))
);
var layoutMap$2 = {
  stack: stack$1,
  horizontal: horizontal,
  "input-only": inputOnly,
};
var StyledFormField = styled__default["default"].div(
  templateObject_4$3 ||
    (templateObject_4$3 = __makeTemplateObject$c(
      [
        "\n  display: flex;\n  margin-bottom: 1rem;\n  position: relative;\n\n  fieldset {\n    margin: 0;\n    border: none;\n    padding: 0;\n  }\n\n  .ch-help-text {\n    font-size: ",
        ";\n    margin-top: 0.5rem;\n    color: ",
        ";\n  }\n\n  legend {\n    font-size: ",
        ";\n    color: ",
        ";\n    margin-bottom: 0.5rem;\n  }\n\n  ",
        "\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  display: flex;\n  margin-bottom: 1rem;\n  position: relative;\n\n  fieldset {\n    margin: 0;\n    border: none;\n    padding: 0;\n  }\n\n  .ch-help-text {\n    font-size: ",
        ";\n    margin-top: 0.5rem;\n    color: ",
        ";\n  }\n\n  legend {\n    font-size: ",
        ";\n    color: ",
        ";\n    margin-bottom: 0.5rem;\n  }\n\n  ",
        "\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.fontSizes.small.fontSize;
  },
  function (props) {
    return !!props.error
      ? props.theme.inputs.error.fontColor
      : props.theme.inputs.fontColor;
  },
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.inputs.fontColor;
  },
  function (props) {
    return !!props.layout && layoutMap$2[props.layout];
  },
  baseSpacing,
  baseStyles
);
var templateObject_1$c,
  templateObject_2$6,
  templateObject_3$5,
  templateObject_4$3;

const rnds8 = new Uint8Array(16);
function rng() {
  return crypto__default["default"].randomFillSync(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (
    byteToHex[arr[offset + 0]] +
    byteToHex[arr[offset + 1]] +
    byteToHex[arr[offset + 2]] +
    byteToHex[arr[offset + 3]] +
    "-" +
    byteToHex[arr[offset + 4]] +
    byteToHex[arr[offset + 5]] +
    "-" +
    byteToHex[arr[offset + 6]] +
    byteToHex[arr[offset + 7]] +
    "-" +
    byteToHex[arr[offset + 8]] +
    byteToHex[arr[offset + 9]] +
    "-" +
    byteToHex[arr[offset + 10]] +
    byteToHex[arr[offset + 11]] +
    byteToHex[arr[offset + 12]] +
    byteToHex[arr[offset + 13]] +
    byteToHex[arr[offset + 14]] +
    byteToHex[arr[offset + 15]]
  ).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// ensure that this never changes on re-render by
// omitting a function to update state
function useUniqueId() {
  var uniqueId = React.useState(function () {
    return v4();
  })[0];
  return uniqueId;
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$11 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$11 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$11.apply(this, arguments);
  };
var __rest$k =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var FormField = React.forwardRef(function (props, ref) {
  var _a;
  var Field = props.field,
    label = props.label,
    _b = props.layout,
    layout = _b === void 0 ? "stack" : _b,
    errorText = props.errorText,
    fieldProps = props.fieldProps,
    infoText = props.infoText,
    error = props.error,
    onChange = props.onChange,
    value = props.value,
    checked = props.checked,
    options = props.options,
    className = props.className,
    rest = __rest$k(props, [
      "field",
      "label",
      "layout",
      "errorText",
      "fieldProps",
      "infoText",
      "error",
      "onChange",
      "value",
      "checked",
      "options",
      "className",
    ]);
  var displayName =
    ((_a = Field.displayName) === null || _a === void 0
      ? void 0
      : _a.toLowerCase()) || "";
  var labelId = useUniqueId();
  var descriptionId = useUniqueId();
  var helpText = (error && errorText) || infoText;
  var renderLabel = function () {
    if (layout === "input-only" && displayName !== "checkbox") {
      return null;
    }
    if (displayName !== "radiogroup") {
      return React__default["default"].createElement(
        Label,
        { htmlFor: labelId, className: "ch-" + displayName + "-label" },
        label
      );
    }
    return false;
  };
  return React__default["default"].createElement(
    StyledFormField,
    __assign$11(
      {
        layout: layout,
        error: error,
        className: "ch-form-field-" + displayName + " " + (className || ""),
        "data-testid": "form-field",
      },
      rest
    ),
    renderLabel(),
    displayName === "radiogroup"
      ? React__default["default"].createElement(
          "fieldset",
          {
            "aria-describedby": helpText && descriptionId,
            "aria-invalid": error,
          },
          label &&
            React__default["default"].createElement("legend", null, label),
          React__default["default"].createElement(
            Field,
            __assign$11(
              {
                options: options,
                ref: ref,
                id: labelId,
                onChange: onChange,
                value: value,
              },
              fieldProps
            )
          )
        )
      : React__default["default"].createElement(
          Field,
          __assign$11(
            {
              options: options,
              "aria-label": (layout === "input-only" && label) || null,
              "aria-describedby": helpText && descriptionId,
              "aria-invalid": error,
              ref: ref,
              id: labelId,
              onChange: onChange,
              value: value,
              checked: checked,
            },
            fieldProps
          )
        ),
    helpText &&
      React__default["default"].createElement(
        "span",
        { className: "ch-help-text", id: descriptionId },
        helpText
      )
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$d =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledHeading = styled__default["default"].h1(
  templateObject_1$d ||
    (templateObject_1$d = __makeTemplateObject$d(
      [
        "\n  display: block;\n  margin: 0;\n\n  font-size: ",
        ";\n  font-weight: ",
        ";\n  line-height: ",
        ";\n\n  ",
        " {\n    font-size: ",
        ";\n    font-weight: ",
        ";\n    line-height:  ",
        ";\n  };\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  display: block;\n  margin: 0;\n\n  font-size: ",
        ";\n  font-weight: ",
        ";\n  line-height: ",
        ";\n\n  ",
        " {\n    font-size: ",
        ";\n    font-weight: ",
        ";\n    line-height:  ",
        ";\n  };\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.fontSizes["h" + props.level].mobile.fontSize;
  },
  function (props) {
    return props.theme.fontSizes["h" + props.level].mobile.fontWeight;
  },
  function (props) {
    return props.theme.fontSizes["h" + props.level].mobile.lineHeight;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.min.md;
  },
  function (props) {
    return props.theme.fontSizes["h" + props.level].fontSize;
  },
  function (props) {
    return props.theme.fontSizes["h" + props.level].fontWeight;
  },
  function (props) {
    return props.theme.fontSizes["h" + props.level].lineHeight;
  },
  baseSpacing,
  baseStyles
);
var templateObject_1$d;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$12 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$12 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$12.apply(this, arguments);
  };
var __rest$l =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Heading = React.forwardRef(function (props, ref) {
  var tag = props.tag,
    children = props.children,
    className = props.className,
    level = props.level,
    rest = __rest$l(props, ["tag", "children", "className", "level"]);
  return React__default["default"].createElement(
    StyledHeading,
    __assign$12(
      {
        as: tag || "h" + level,
        className: className || "",
        level: level,
        ref: ref,
        "data-testid": "heading",
      },
      rest
    ),
    children
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$e =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var getPadding = function (props) {
  var sizing = props.sizing,
    leadingIcon = props.leadingIcon;
  return sizing === "sm"
    ? "0.125rem 1.75rem 0.125rem " + (leadingIcon ? "1.3125rem" : "0.5rem")
    : "0.34375rem 1.75rem 0.34375rem " + (leadingIcon ? "1.3125rem" : "0.5rem");
};
var StyledInputWrapper = styled__default["default"].span(
  templateObject_1$e ||
    (templateObject_1$e = __makeTemplateObject$e(
      [
        "\n  position: relative;\n\n  > .ch-icon {\n    position: absolute;\n    width: 1rem;\n    left: 0.1875rem;\n    position: absolute;\n    top: 54%;\n    transform: translateY(-50%);\n  }\n\n  > input {\n    padding: ",
        ";\n  }\n",
      ],
      [
        "\n  position: relative;\n\n  > .ch-icon {\n    position: absolute;\n    width: 1rem;\n    left: 0.1875rem;\n    position: absolute;\n    top: 54%;\n    transform: translateY(-50%);\n  }\n\n  > input {\n    padding: ",
        ";\n  }\n",
      ]
    )),
  function (props) {
    return getPadding(props);
  }
);
var StyledInput = styled__default["default"].input(
  templateObject_2$7 ||
    (templateObject_2$7 = __makeTemplateObject$e(
      [
        "\n  align-items: center;\n  display: flex;\n  letter-spacing: -0.005625rem;\n  transition: box-shadow 0.05s ease-in;\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  color: ",
        ";\n  font-size: ",
        ";\n  line-height: ",
        ";\n\n  &::placeholder {\n    color: ",
        ";\n  }\n\n  &:focus,\n  &[aria-invalid='true']:focus {\n    border: ",
        ";\n    box-shadow: ",
        ";\n    outline: none;\n  }\n\n  &[aria-invalid='true'] {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  // Hides native clear button\n  &::-webkit-search-decoration,\n  ::-webkit-search-cancel-button,\n  ::-webkit-search-results-button,\n  ::-webkit-search-results-decoration {\n    display: none;\n  }\n\n  &::-ms-clear,\n  &::-ms-reveal {\n    display: none;\n    width: 0;\n    height: 0;\n  }\n",
      ],
      [
        "\n  align-items: center;\n  display: flex;\n  letter-spacing: -0.005625rem;\n  transition: box-shadow 0.05s ease-in;\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  color: ",
        ";\n  font-size: ",
        ";\n  line-height: ",
        ";\n\n  &::placeholder {\n    color: ",
        ";\n  }\n\n  &:focus,\n  &[aria-invalid='true']:focus {\n    border: ",
        ";\n    box-shadow: ",
        ";\n    outline: none;\n  }\n\n  &[aria-invalid='true'] {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  // Hides native clear button\n  &::-webkit-search-decoration,\n  ::-webkit-search-cancel-button,\n  ::-webkit-search-results-button,\n  ::-webkit-search-results-decoration {\n    display: none;\n  }\n\n  &::-ms-clear,\n  &::-ms-reveal {\n    display: none;\n    width: 0;\n    height: 0;\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.inputs.bgd;
  },
  function (props) {
    return props.theme.inputs.border;
  },
  function (props) {
    return props.theme.inputs.borderRadius;
  },
  function (props) {
    return props.theme.inputs.shadow;
  },
  function (props) {
    return props.theme.inputs.fontColor;
  },
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.fontSizes.text.lineHeight;
  },
  function (props) {
    return props.theme.inputs.placeholder;
  },
  function (props) {
    return props.theme.inputs.focus.border;
  },
  function (props) {
    return props.theme.inputs.focus.shadow;
  },
  function (props) {
    return props.theme.inputs.error.border;
  },
  function (props) {
    return props.theme.inputs.error.shadow;
  }
);
var StyledClear = styled__default["default"].button(
  templateObject_3$6 ||
    (templateObject_3$6 = __makeTemplateObject$e(
      [
        "\n  position: absolute;\n  top: 50%;\n  right: 0.125rem;\n  transform: translateY(-44%);\n  border: none;\n  background: none;\n  cursor: pointer;\n  display: ",
        ";\n\n  path {\n    fill: ",
        ";\n  }\n\n  &:active,\n  &:focus {\n    outline: none;\n  }\n",
      ],
      [
        "\n  position: absolute;\n  top: 50%;\n  right: 0.125rem;\n  transform: translateY(-44%);\n  border: none;\n  background: none;\n  cursor: pointer;\n  display: ",
        ";\n\n  path {\n    fill: ",
        ";\n  }\n\n  &:active,\n  &:focus {\n    outline: none;\n  }\n",
      ]
    )),
  function (props) {
    return props.active ? "block" : "none";
  },
  function (props) {
    return props.theme.inputs.clearBg;
  }
);
var templateObject_1$e, templateObject_2$7, templateObject_3$6;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$13 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$13 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$13.apply(this, arguments);
  };
var InputWrapper = React.forwardRef(function (props, ref) {
  var leadingIcon = props.leadingIcon,
    children = props.children;
  return React__default["default"].createElement(
    StyledInputWrapper,
    __assign$13({ ref: ref }, props, { "data-testid": "input-wrapper" }),
    leadingIcon &&
      React__default["default"].createElement(
        "span",
        { className: "ch-icon" },
        leadingIcon
      ),
    children
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$14 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$14 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$14.apply(this, arguments);
  };
var __rest$m =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Input = React.forwardRef(function (props, externalRef) {
  var type = props.type,
    value = props.value,
    sizing = props.sizing,
    onClear = props.onClear,
    onChange = props.onChange,
    className = props.className,
    leadingIcon = props.leadingIcon,
    _a = props.showClear,
    showClear = _a === void 0 ? true : _a,
    rest = __rest$m(props, [
      "type",
      "value",
      "sizing",
      "onClear",
      "onChange",
      "className",
      "leadingIcon",
      "showClear",
    ]);
  var _b = React.useState(false),
    focused = _b[0],
    setFocused = _b[1];
  var focusedRef = React.useRef(false);
  var internalRef = React.useRef(null);
  var inputRef = externalRef || internalRef;
  var clearRef = React.useRef(null);
  var label = props["aria-label"] ? "clear " + props["aria-label"] : "clear";
  var handleClear = function () {
    var _a;
    if (onClear) {
      onClear();
      return;
    }
    var input = inputRef.current;
    var nativeSetter =
      (_a = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )) === null || _a === void 0
        ? void 0
        : _a.set;
    if (nativeSetter && input) {
      nativeSetter.call(input, "");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    input.focus();
  };
  React.useEffect(function () {
    var blurring = false;
    var onFocus = function (e) {
      if (!focusedRef.current) {
        return;
      }
      if (e.target !== clearRef.current && e.target !== inputRef.current) {
        focusedRef.current = false;
        setFocused(false);
        return;
      }
      if (blurring) {
        blurring = false;
      }
    };
    var onFocusOut = function (e) {
      if (!focusedRef.current) {
        return;
      }
      blurring = true;
      setTimeout(function () {
        if (blurring) {
          focusedRef.current = false;
          setFocused(false);
        }
        blurring = false;
      }, 10);
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onFocusOut);
    return function () {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);
  return React__default["default"].createElement(
    InputWrapper,
    {
      leadingIcon: leadingIcon,
      sizing: sizing,
      className: "ch-input-wrapper " + (className || ""),
    },
    React__default["default"].createElement(
      StyledInput,
      __assign$14({}, rest, {
        value: value,
        type: type || "text",
        ref: inputRef,
        className: "ch-input",
        onChange: onChange,
        "data-testid": "input",
        onFocus: function () {
          focusedRef.current = true;
          setFocused(true);
        },
      })
    ),
    showClear &&
      React__default["default"].createElement(
        StyledClear,
        {
          type: "button",
          active: !!(onClear || (focused && value.length)),
          tabIndex: -1,
          "aria-label": label,
          onClick: handleClear,
          ref: clearRef,
        },
        React__default["default"].createElement(Clear, { width: "1.25rem" })
      )
  );
});
Input.displayName = "Input";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$15 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$15 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$15.apply(this, arguments);
  };
var SearchInput = React.forwardRef(function (props, ref) {
  var searchProps = __assign$15(__assign$15({}, props), {
    sizing: "sm",
    type: "search",
    leadingIcon: React__default["default"].createElement(Search, {
      "data-testid": "search-icon",
    }),
  });
  return React__default["default"].createElement(
    Input,
    __assign$15({}, searchProps, { ref: ref })
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var ModalContext = React.createContext({
  onClose: function () {},
  labelID: "",
});
var useModalContext = function () {
  return React.useContext(ModalContext);
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var Portal = function (_a) {
  var children = _a.children,
    rootId = _a.rootId;
  var el;
  var newRoot;
  var _b = React.useState(),
    mount = _b[0],
    setMount = _b[1];
  React.useEffect(
    function () {
      if (!!rootId) {
        el = document.getElementById(rootId);
      }
      if (!!el) {
        setMount(el);
      } else {
        newRoot = document.createElement("div");
        document.body.appendChild(newRoot);
        setMount(newRoot);
      }
      return function () {
        !!newRoot && newRoot.remove();
      };
    },
    [rootId]
  );
  return mount ? reactDom.createPortal(children, mount) : null;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$f =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var fadeAnimation = styled.keyframes(
  templateObject_1$f ||
    (templateObject_1$f = __makeTemplateObject$f(
      ["\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n"],
      ["\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n"]
    ))
);
var slideDownAndScaleUp = styled.keyframes(
  templateObject_2$8 ||
    (templateObject_2$8 = __makeTemplateObject$f(
      [
        "\n  0% {\n    opacity: 0;\n    transform: translateY(4rem) scale(0.4);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n",
      ],
      [
        "\n  0% {\n    opacity: 0;\n    transform: translateY(4rem) scale(0.4);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n",
      ]
    ))
);
var templateObject_1$f, templateObject_2$8;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$g =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledModal = styled__default["default"].div(
  templateObject_1$g ||
    (templateObject_1$g = __makeTemplateObject$g(
      [
        "\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: ",
        ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: ",
        ";\n  overflow-x: hidden;\n  animation: ",
        " 0.25s ease 0s forwards;\n  will-change: opacity;\n\n  > section {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    border-radius: ",
        ";\n    color: ",
        ";\n    background-color: ",
        ";\n    width: ",
        ";\n    box-shadow: ",
        ";\n    max-width: ",
        ";\n    height: ",
        ";\n    max-height: ",
        ";\n    will-change: transform, opacity;\n    animation: ",
        " 0.15s ease 0s forwards;\n\n    @media only screen and (max-height: 25rem) {\n      position: absolute;\n      top: 2rem;\n      height: auto;\n      max-height: none;\n    }\n  }\n",
      ],
      [
        "\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: ",
        ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: ",
        ";\n  overflow-x: hidden;\n  animation: ",
        " 0.25s ease 0s forwards;\n  will-change: opacity;\n\n  > section {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    border-radius: ",
        ";\n    color: ",
        ";\n    background-color: ",
        ";\n    width: ",
        ";\n    box-shadow: ",
        ";\n    max-width: ",
        ";\n    height: ",
        ";\n    max-height: ",
        ";\n    will-change: transform, opacity;\n    animation: ",
        " 0.15s ease 0s forwards;\n\n    @media only screen and (max-height: 25rem) {\n      position: absolute;\n      top: 2rem;\n      height: auto;\n      max-height: none;\n    }\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.modal.wrapperBgd;
  },
  function (props) {
    return props.theme.zIndex.modal;
  },
  fadeAnimation,
  function (props) {
    return props.theme.radii.default;
  },
  function (props) {
    return props.theme.modal.text;
  },
  function (props) {
    return props.theme.modal.bgd;
  },
  function (props) {
    return props.theme.modalSizes[props.size || "md"].width;
  },
  function (props) {
    return props.theme.modal.shadow;
  },
  function (props) {
    return props.size === "fullscreen"
      ? props.theme.modalSizes[props.size].width
      : "90vw";
  },
  function (props) {
    return props.size === "fullscreen"
      ? props.theme.modalSizes[props.size].height
      : "auto";
  },
  function (props) {
    return props.theme.modalSizes[props.size || "md"].height;
  },
  slideDownAndScaleUp
);
var StyledModalHeader = styled__default["default"].header(
  templateObject_2$9 ||
    (templateObject_2$9 = __makeTemplateObject$g(
      [
        "\n  padding: 1rem 1.5rem;\n\n  .ch-close-button {\n    position: absolute;\n    right: 1.55rem;\n    top: 1rem;\n  }\n\n  .ch-title {\n    padding-right: 2rem;\n    margin: 0;\n    font-size: ",
        ";\n    font-weight: ",
        ";\n  }\n",
      ],
      [
        "\n  padding: 1rem 1.5rem;\n\n  .ch-close-button {\n    position: absolute;\n    right: 1.55rem;\n    top: 1rem;\n  }\n\n  .ch-title {\n    padding-right: 2rem;\n    margin: 0;\n    font-size: ",
        ";\n    font-weight: ",
        ";\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.modal.titleSize;
  },
  function (props) {
    return props.theme.modal.titleWeight;
  }
);
var StyledModalBody = styled__default["default"].div(
  templateObject_3$7 ||
    (templateObject_3$7 = __makeTemplateObject$g(
      [
        "\n  font-size: ",
        ";\n  line-height: ",
        ";\n  padding: 0 1.5rem;\n  flex-grow: 1;\n  overflow-y: auto;\n",
      ],
      [
        "\n  font-size: ",
        ";\n  line-height: ",
        ";\n  padding: 0 1.5rem;\n  flex-grow: 1;\n  overflow-y: auto;\n",
      ]
    )),
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.fontSizes.text.lineHeight;
  }
);
var StyledModalButtonGroup = styled__default["default"].footer(
  templateObject_4$4 ||
    (templateObject_4$4 = __makeTemplateObject$g(
      [
        "\n  padding: 1.5rem;\n  border-top: 1px solid ",
        ";\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n\n  div:first-child {\n    display: flex;\n    flex-direction: row-reverse;\n  }\n\n  button + button {\n    margin: 0 0.5rem 0 0.5rem;\n  }\n\n  @media (max-width: 35rem) {\n    flex-direction: column;\n\n    button {\n      width: 100%;\n    }\n\n    div:first-child {\n      display: flex;\n      flex-direction: column;\n    }\n\n    button + button,\n    div + div {\n      margin: 0.5rem 0 0;\n    }\n  }\n",
      ],
      [
        "\n  padding: 1.5rem;\n  border-top: 1px solid ",
        ";\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n\n  div:first-child {\n    display: flex;\n    flex-direction: row-reverse;\n  }\n\n  button + button {\n    margin: 0 0.5rem 0 0.5rem;\n  }\n\n  @media (max-width: 35rem) {\n    flex-direction: column;\n\n    button {\n      width: 100%;\n    }\n\n    div:first-child {\n      display: flex;\n      flex-direction: column;\n    }\n\n    button + button,\n    div + div {\n      margin: 0.5rem 0 0;\n    }\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.modal.border;
  }
);
var templateObject_1$g,
  templateObject_2$9,
  templateObject_3$7,
  templateObject_4$4;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var trapFocus = function (e, content) {
  if (!content) {
    return;
  }
  var focusableElements = content.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  var firstFocusableEl = focusableElements[0];
  var lastFocusableEl = focusableElements[focusableElements.length - 1];
  if (e.keyCode === KEY_CODES.TAB) {
    if (e.shiftKey && document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  }
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$16 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$16 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$16.apply(this, arguments);
  };
var __rest$n =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Modal = function (_a) {
  var _b = _a.size,
    size = _b === void 0 ? "md" : _b,
    onClose = _a.onClose,
    children = _a.children,
    rootId = _a.rootId,
    rest = __rest$n(_a, ["size", "onClose", "children", "rootId"]);
  var labelID = useUniqueId();
  var contentEl = React.useRef(null);
  var mainEl = React.useRef(null);
  var modalContext = { onClose: onClose, labelID: labelID };
  useClickOutside(mainEl, onClose);
  React.useEffect(function () {
    // return focus to the element that triggered the
    // modal when the modal closes
    var activeNode = document.activeElement;
    return function () {
      return !!activeNode && activeNode.focus();
    };
  }, []);
  React.useEffect(function () {
    // ensure that the focus event fires after Portal render is complete
    setTimeout(function () {
      var _a;
      return (_a = mainEl.current) === null || _a === void 0
        ? void 0
        : _a.focus();
    }, 0);
    var onKeydown = function (e) {
      if (e.keyCode === KEY_CODES.ESCAPE && onClose) {
        onClose();
      } else {
        trapFocus(e, contentEl.current);
      }
    };
    window.addEventListener("keydown", function (e) {
      return onKeydown(e);
    });
    return function () {
      return window.removeEventListener("keydown", function (e) {
        return onKeydown(e);
      });
    };
  }, []);
  return React__default["default"].createElement(
    Portal,
    { rootId: rootId },
    React__default["default"].createElement(
      ModalContext.Provider,
      { value: modalContext },
      React__default["default"].createElement(
        StyledModal,
        __assign$16({}, rest, {
          size: size,
          onClose: onClose,
          ref: contentEl,
          "data-testid": "modal",
        }),
        React__default["default"].createElement(
          "section",
          {
            "aria-modal": true,
            ref: mainEl,
            role: "dialog",
            tabIndex: 0,
            "aria-labelledby": labelID,
          },
          children
        )
      )
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$17 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$17 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$17.apply(this, arguments);
  };
var __rest$o =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ModalBody = function (_a) {
  var children = _a.children,
    rest = __rest$o(_a, ["children"]);
  return React__default["default"].createElement(
    StyledModalBody,
    __assign$17({ "data-testid": "modal-body" }, rest),
    children
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$18 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$18 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$18.apply(this, arguments);
  };
var __rest$p =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ModalButton = function (_a) {
  var closesModal = _a.closesModal,
    rest = __rest$p(_a, ["closesModal"]);
  return React__default["default"].createElement(Button, __assign$18({}, rest));
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var ModalButtonGroup = function (_a) {
  var primaryButtons = _a.primaryButtons,
    secondaryButtons = _a.secondaryButtons;
  var context = useModalContext();
  var addCloseBehaviorToButton = function (button) {
    return React__default["default"].cloneElement(button, {
      onClick: function () {
        button.props.onClick && button.props.onClick();
        !!button.props.closesModal && context.onClose();
      },
      key: button.props.label,
    });
  };
  var addCloseBehaviorToButtons = function (buttons) {
    if (!buttons || (buttons instanceof Array && buttons.length === 0)) {
      return buttons;
    }
    if (!(buttons instanceof Array)) {
      return addCloseBehaviorToButton(buttons);
    }
    return buttons.map(addCloseBehaviorToButton);
  };
  return React__default["default"].createElement(
    StyledModalButtonGroup,
    { "data-testid": "modal-button-group" },
    React__default["default"].createElement(
      "div",
      null,
      addCloseBehaviorToButtons(primaryButtons)
    ),
    secondaryButtons &&
      React__default["default"].createElement(
        "div",
        null,
        addCloseBehaviorToButtons(secondaryButtons)
      )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$19 =
  (undefined && undefined.__assign) ||
  function () {
    __assign$19 =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$19.apply(this, arguments);
  };
var __rest$q =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ModalHeader = function (_a) {
  var _b = _a.tag,
    Tag = _b === void 0 ? "div" : _b,
    _c = _a.displayClose,
    displayClose = _c === void 0 ? true : _c,
    title = _a.title,
    rest = __rest$q(_a, ["tag", "displayClose", "title"]);
  var context = useModalContext();
  var handleClick = function () {
    return context && context.onClose();
  };
  return React__default["default"].createElement(
    StyledModalHeader,
    __assign$19({}, rest),
    React__default["default"].createElement(
      Tag,
      { className: "ch-title", id: context.labelID },
      title
    ),
    displayClose &&
      React__default["default"].createElement(IconButton, {
        label: "Close",
        icon: React__default["default"].createElement(Remove, null),
        className: "ch-close-button",
        onClick: handleClick,
      })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$h =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledNavbar = styled__default["default"](Flex)(
  templateObject_1$h ||
    (templateObject_1$h = __makeTemplateObject$h(
      [
        "\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 20rem;\n  max-width: 100%;\n  color: ",
        ";\n  background-color: ",
        ";\n\n  ",
        " {\n    width: 4.25rem;\n    padding-left: 0;\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 20rem;\n  max-width: 100%;\n  color: ",
        ";\n  background-color: ",
        ";\n\n  ",
        " {\n    width: 4.25rem;\n    padding-left: 0;\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.navbar.text;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.navbar.bgd;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.min.md;
  },
  baseStyles,
  baseSpacing
);
var StyledNavbarItem = styled__default["default"].div(
  templateObject_2$a ||
    (templateObject_2$a = __makeTemplateObject$h(
      [
        "\n  display: flex;\n  align-items: center;\n  height: 3rem;\n\n  ",
        " {\n    margin-left: 0.5rem;\n\n    .ch-navigation-bar-item-label {\n      margin-left: 0.625rem;\n    }\n  }\n\n  ",
        " {\n    .ch-navigation-bar-item-label {\n      display: none;\n    }\n    margin-left: 0.5rem;\n  }\n",
      ],
      [
        "\n  display: flex;\n  align-items: center;\n  height: 3rem;\n\n  ",
        " {\n    margin-left: 0.5rem;\n\n    .ch-navigation-bar-item-label {\n      margin-left: 0.625rem;\n    }\n  }\n\n  ",
        " {\n    .ch-navigation-bar-item-label {\n      display: none;\n    }\n    margin-left: 0.5rem;\n  }\n",
      ]
    )),
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.max.xs;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.min.md;
  }
);
var StyledHeader = styled__default["default"].div(
  templateObject_3$8 ||
    (templateObject_3$8 = __makeTemplateObject$h(
      [
        "\n  display: flex;\n  height: 3rem;\n  align-items: center;\n  border-bottom: 0.03125rem solid ",
        ";\n  padding: 1rem;\n\n  .ch-btn-close {\n    margin-left: auto;\n    margin-right: 1rem;\n  }\n\n  ",
        " {\n    display: none;\n  }\n",
      ],
      [
        "\n  display: flex;\n  height: 3rem;\n  align-items: center;\n  border-bottom: 0.03125rem solid ",
        ";\n  padding: 1rem;\n\n  .ch-btn-close {\n    margin-left: auto;\n    margin-right: 1rem;\n  }\n\n  ",
        " {\n    display: none;\n  }\n",
      ]
    )),
  function (_a) {
    var theme = _a.theme;
    return theme.navbar.headerBorder;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.min.md;
  }
);
var templateObject_1$h, templateObject_2$a, templateObject_3$8;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1a =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1a =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1a.apply(this, arguments);
  };
var __rest$r =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Navbar = function (_a) {
  var children = _a.children,
    className = _a.className,
    rest = __rest$r(_a, ["children", "className"]);
  return React__default["default"].createElement(
    StyledNavbar,
    __assign$1a({ "data-testid": "navigation-bar" }, rest, {
      className: className || "",
    }),
    children
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1b =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1b =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1b.apply(this, arguments);
  };
var __rest$s =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var NavbarHeader = function (_a) {
  var title = _a.title,
    onClose = _a.onClose,
    rest = __rest$s(_a, ["title", "onClose"]);
  return React__default["default"].createElement(
    StyledHeader,
    __assign$1b({}, rest),
    React__default["default"].createElement(
      "span",
      { className: "ch-title" },
      title
    ),
    onClose &&
      React__default["default"].createElement(IconButton, {
        className: "ch-btn-close",
        label: "Close",
        onClick: onClose,
        icon: React__default["default"].createElement(Remove, null),
      })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1c =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1c =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1c.apply(this, arguments);
  };
var __rest$t =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var NavbarItem = function (_a) {
  var onClick = _a.onClick,
    label = _a.label,
    icon = _a.icon,
    _b = _a.isSelected,
    isSelected = _b === void 0 ? false : _b,
    _c = _a.popOver,
    popOver = _c === void 0 ? null : _c,
    rest = __rest$t(_a, ["onClick", "label", "icon", "isSelected", "popOver"]);
  return React__default["default"].createElement(
    StyledNavbarItem,
    __assign$1c({ "data-testid": "navbar-item" }, rest),
    React__default["default"].createElement(ControlBarButton, {
      onClick: onClick,
      label: label,
      icon: icon,
      popOver: popOver,
      isSelected: isSelected,
    }),
    label &&
      React__default["default"].createElement(
        "span",
        {
          "data-testid": "navbar-label",
          className: "ch-navigation-bar-item-label",
          onClick: onClick,
        },
        label
      )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$i =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledCloseIconButton = styled__default["default"](IconButton)(
  templateObject_1$i ||
    (templateObject_1$i = __makeTemplateObject$i([""], [""]))
);
var StyledNotification = styled__default["default"].div(
  templateObject_2$b ||
    (templateObject_2$b = __makeTemplateObject$i(
      [
        "\n  position: relative;\n  display: inline-flex;\n  align-items: flex-start;\n  color: ",
        ";\n  background-color: ",
        ";\n  padding: 0.5rem;\n  box-shadow: ",
        ";\n  border-radius: 0.25rem;\n  margin: 0.5rem;\n  max-width: 45rem;\n\n  .ch-severity-icon {\n    width: 1.5rem;\n    flex-shrink: 0;\n    margin-top: 0.25rem;\n  }\n\n  .ch-message {\n    display: flex;\n    flex-flow: column wrap;\n    font-size: ",
        ";\n    font-size: ",
        ";\n    letter-spacing: -0.005625rem;\n    margin: 0.5rem 3.3125rem 0.375rem 0.75rem;\n  }\n\n  ",
        " {\n    background-color: ",
        ";\n    color: ",
        "};\n  }\n\n  ",
        ":hover, ",
        ":focus {\n    background-color: ",
        ";\n    color: ",
        ";\n  }\n\n  ",
        ":active {\n    background-color: ",
        ";\n    color: ",
        ";\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  position: relative;\n  display: inline-flex;\n  align-items: flex-start;\n  color: ",
        ";\n  background-color: ",
        ";\n  padding: 0.5rem;\n  box-shadow: ",
        ";\n  border-radius: 0.25rem;\n  margin: 0.5rem;\n  max-width: 45rem;\n\n  .ch-severity-icon {\n    width: 1.5rem;\n    flex-shrink: 0;\n    margin-top: 0.25rem;\n  }\n\n  .ch-message {\n    display: flex;\n    flex-flow: column wrap;\n    font-size: ",
        ";\n    font-size: ",
        ";\n    letter-spacing: -0.005625rem;\n    margin: 0.5rem 3.3125rem 0.375rem 0.75rem;\n  }\n\n  ",
        " {\n    background-color: ",
        ";\n    color: ",
        "};\n  }\n\n  ",
        ":hover, ",
        ":focus {\n    background-color: ",
        ";\n    color: ",
        ";\n  }\n\n  ",
        ":active {\n    background-color: ",
        ";\n    color: ",
        ";\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (_a) {
    var theme = _a.theme,
      severity = _a.severity;
    return theme.notification[severity].text;
  },
  function (_a) {
    var theme = _a.theme,
      severity = _a.severity;
    return theme.colors[severity].primary;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.notification.shadow;
  },
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.fontSizes.text.lineHeight;
  },
  StyledCloseIconButton,
  function (_a) {
    var theme = _a.theme,
      severity = _a.severity;
    return theme.colors[severity].primary;
  },
  function (_a) {
    var theme = _a.theme,
      severity = _a.severity;
    return theme.notification[severity].closeButton.text;
  },
  StyledCloseIconButton,
  StyledCloseIconButton,
  function (_a) {
    var theme = _a.theme,
      severity = _a.severity;
    return theme.notification[severity].closeButton.hover.bgd;
  },
  function (_a) {
    var theme = _a.theme,
      severity = _a.severity;
    return theme.notification[severity].closeButton.hover.text;
  },
  StyledCloseIconButton,
  function (_a) {
    var theme = _a.theme,
      severity = _a.severity;
    return theme.notification[severity].closeButton.active.bgd;
  },
  function (_a) {
    var theme = _a.theme,
      severity = _a.severity;
    return theme.notification[severity].closeButton.active.text;
  },
  baseSpacing,
  baseStyles
);
var templateObject_1$i, templateObject_2$b;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1d =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1d =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1d.apply(this, arguments);
  };
var DEFAULT_DELAY = 6000;
var Severity;
(function (Severity) {
  Severity["ERROR"] = "error";
  Severity["SUCCESS"] = "success";
  Severity["INFO"] = "info";
  Severity["WARNING"] = "warning";
})(Severity || (Severity = {}));
var iconMapping = {
  success: React__default["default"].createElement(CheckRound, null),
  warning: React__default["default"].createElement(Clock, null),
  error: React__default["default"].createElement(Caution, null),
  info: React__default["default"].createElement(Information, null),
};
var Notification = function (props) {
  var tag = props.tag,
    message = props.message,
    onClose = props.onClose,
    _a = props.autoClose,
    autoClose = _a === void 0 ? false : _a,
    _b = props.autoCloseDelay,
    autoCloseDelay = _b === void 0 ? DEFAULT_DELAY : _b,
    _c = props.severity,
    severity = _c === void 0 ? Severity.ERROR : _c,
    className = props.className;
  var ariaLive = severity === Severity.ERROR ? "assertive" : "polite";
  var ariaRole = severity === Severity.ERROR ? "alert" : "status";
  React.useEffect(function () {
    if (!autoClose) {
      return;
    }
    var timer = setTimeout(onClose, autoCloseDelay);
    return function () {
      return clearTimeout(timer);
    };
  }, []);
  return React__default["default"].createElement(
    StyledNotification,
    __assign$1d(
      { "aria-live": ariaLive, role: ariaRole, severity: severity, as: tag },
      props,
      { className: className || "", "data-testid": "notification" }
    ),
    React__default["default"].createElement(
      "div",
      { className: "ch-severity-icon", "data-testid": "severity-icon" },
      iconMapping[severity]
    ),
    React__default["default"].createElement(
      "output",
      { className: "ch-message", "data-testid": "message", role: ariaRole },
      message
    ),
    onClose &&
      React__default["default"].createElement(StyledCloseIconButton, {
        label: "close",
        icon: React__default["default"].createElement(Remove, null),
        onClick: onClose,
      })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1e =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1e =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1e.apply(this, arguments);
  };
var __spreadArrays =
  (undefined && undefined.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
(function (Severity) {
  Severity["ERROR"] = "error";
  Severity["SUCCESS"] = "success";
  Severity["INFO"] = "info";
  Severity["WARNING"] = "warning";
})(exports.Severity || (exports.Severity = {}));
(function (ActionType) {
  ActionType[(ActionType["ADD"] = 0)] = "ADD";
  ActionType[(ActionType["REMOVE"] = 1)] = "REMOVE";
  ActionType[(ActionType["REMOVE_ALL"] = 2)] = "REMOVE_ALL";
})(exports.ActionType || (exports.ActionType = {}));
var initialState = {
  notifications: [],
};
var reducer = function (state, action) {
  var type = action.type,
    payload = action.payload;
  switch (type) {
    case exports.ActionType.ADD: {
      var notification = __assign$1e({ id: v4() }, payload);
      var notifications = (
        notification === null || notification === void 0
          ? void 0
          : notification.replaceAll
      )
        ? [notification]
        : __spreadArrays(state.notifications, [notification]);
      return __assign$1e(__assign$1e({}, state), {
        notifications: notifications,
      });
    }
    case exports.ActionType.REMOVE: {
      var notifications = state.notifications.filter(function (notification) {
        return (
          (notification === null || notification === void 0
            ? void 0
            : notification.id) !== payload
        );
      });
      return __assign$1e(__assign$1e({}, state), {
        notifications: notifications,
      });
    }
    case exports.ActionType.REMOVE_ALL: {
      return __assign$1e(__assign$1e({}, state), { notifications: [] });
    }
    default:
      throw new Error("Incorrect type in NotificationProvider");
  }
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var StateContext = React__default["default"].createContext(initialState);
var DispatchContext = React__default["default"].createContext(function () {});
var NotificationProvider = function (_a) {
  var children = _a.children;
  var _b = React.useReducer(reducer, initialState),
    state = _b[0],
    dispatch = _b[1];
  return React__default["default"].createElement(
    StateContext.Provider,
    { value: state },
    React__default["default"].createElement(
      DispatchContext.Provider,
      { value: dispatch },
      children
    )
  );
};
var useNotificationState = function () {
  var state = React.useContext(StateContext);
  return state;
};
var useNotificationDispatch = function () {
  var dispatch = React.useContext(DispatchContext);
  return dispatch;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$j =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledNotificationGroup = styled__default["default"].div(
  templateObject_1$j ||
    (templateObject_1$j = __makeTemplateObject$j(
      [
        "\n  position: fixed;\n  top: 2rem;\n  left: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: ",
        ";\n",
      ],
      [
        "\n  position: fixed;\n  top: 2rem;\n  left: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: ",
        ";\n",
      ]
    )),
  function (props) {
    return props.theme.zIndex.notificationGroup;
  }
);
var templateObject_1$j;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1f =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1f =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1f.apply(this, arguments);
  };
var __rest$u =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var NotificationGroup = function () {
  var notifications = useNotificationState().notifications;
  var dispatch = useNotificationDispatch();
  return React__default["default"].createElement(
    Portal,
    { rootId: "notification-group-root" },
    React__default["default"].createElement(
      StyledNotificationGroup,
      { "data-testid": "notification-group" },
      notifications.map(function (_a) {
        var id = _a.id,
          rest = __rest$u(_a, ["id"]);
        return React__default["default"].createElement(
          Notification,
          __assign$1f({ key: id }, rest, {
            onClose: function () {
              return dispatch({ type: exports.ActionType.REMOVE, payload: id });
            },
          })
        );
      })
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1g =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1g =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1g.apply(this, arguments);
  };
var __rest$v =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var PopOverHeader = function (_a) {
  var title = _a.title,
    subtitle = _a.subtitle,
    imgSrc = _a.imgSrc,
    rest = __rest$v(_a, ["title", "subtitle", "imgSrc"]);
  return React__default["default"].createElement(
    StyledPopOverHeader,
    __assign$1g({ "data-testid": "popover-header" }, rest),
    imgSrc &&
      React__default["default"].createElement("img", {
        src: imgSrc,
        alt: title,
      }),
    title &&
      React__default["default"].createElement(
        "p",
        { className: "ch-title" },
        title
      ),
    subtitle &&
      React__default["default"].createElement(
        "p",
        { className: "ch-subtitle" },
        subtitle
      )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1h =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1h =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1h.apply(this, arguments);
  };
var PopOverSeparator = function (props) {
  return React__default["default"].createElement(
    StyledPopOverSeparator,
    __assign$1h({ "data-testid": "popover-separator" }, props)
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1i =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1i =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1i.apply(this, arguments);
  };
var __rest$w =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var PopOverSubMenu = function (_a) {
  var text = _a.text,
    children = _a.children,
    rest = __rest$w(_a, ["text", "children"]);
  var getButtonContents = function (isOpen) {
    return React__default["default"].createElement(
      React__default["default"].Fragment,
      null,
      text,
      React__default["default"].createElement(Caret, {
        className: "ch-caret",
        direction: "right",
        "data-testid": "submenu-caret",
      })
    );
  };
  return React__default["default"].createElement(
    StyledSubMenu,
    null,
    React__default["default"].createElement(
      PopOver,
      __assign$1i(
        {
          renderButton: function (isOpen) {
            return getButtonContents();
          },
          placement: "right-start",
          isSubMenu: true,
          a11yLabel: text,
        },
        rest
      ),
      children
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$k =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var HiddenRadio = styled__default["default"].input(
  templateObject_1$k ||
    (templateObject_1$k = __makeTemplateObject$k(
      [
        "\n  ",
        ";\n\n  &[aria-invalid='true'] + .ch-radio {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n",
      ],
      [
        "\n  ",
        ";\n\n  &[aria-invalid='true'] + .ch-radio {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n",
      ]
    )),
  visuallyHidden,
  function (props) {
    return props.theme.inputs.error.border;
  },
  function (props) {
    return props.theme.inputs.error.shadow;
  }
);
var StyledRadioWrapper = styled__default["default"].span(
  templateObject_2$c ||
    (templateObject_2$c = __makeTemplateObject$k(
      ["\n  > label {\n    margin-left: 0.5rem;\n  }\n"],
      ["\n  > label {\n    margin-left: 0.5rem;\n  }\n"]
    ))
);
var StyledRadio = styled__default["default"].div(
  templateObject_3$9 ||
    (templateObject_3$9 = __makeTemplateObject$k(
      [
        "\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  margin-bottom: -0.1875rem;\n  transition: box-shadow 0.05s ease-in;\n\n  ",
        ":checked ~ & {\n    background-color: ",
        ";\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  ",
        ":focus ~ & {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n",
      ],
      [
        "\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  margin-bottom: -0.1875rem;\n  transition: box-shadow 0.05s ease-in;\n\n  ",
        ":checked ~ & {\n    background-color: ",
        ";\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n\n  ",
        ":focus ~ & {\n    border: ",
        ";\n    box-shadow: ",
        ";\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.inputs.bgd;
  },
  function (props) {
    return props.theme.inputs.border;
  },
  function (props) {
    return props.theme.radii.circle;
  },
  function (props) {
    return props.theme.inputs.shadow;
  },
  HiddenRadio,
  function (props) {
    return props.theme.inputs.checked.bgd;
  },
  function (props) {
    return props.theme.inputs.checked.border;
  },
  function (props) {
    return props.theme.inputs.checked.shadow;
  },
  HiddenRadio,
  function (props) {
    return props.theme.inputs.focus.border;
  },
  function (props) {
    return props.theme.inputs.focus.shadow;
  }
);
var StyledRadioLabel = styled__default["default"](StyledRadio)(
  templateObject_4$5 ||
    (templateObject_4$5 = __makeTemplateObject$k(
      [
        "\n  display: inline-block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n\n  &:after {\n    background-color: ",
        ";\n    border-radius: ",
        ";\n    content: '';\n    display: block;\n    height: 0.375rem;\n    padding: 0.03125rem;\n    width: 0.375rem;\n    ",
        ";\n  }\n",
      ],
      [
        "\n  display: inline-block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n\n  &:after {\n    background-color: ",
        ";\n    border-radius: ",
        ";\n    content: '';\n    display: block;\n    height: 0.375rem;\n    padding: 0.03125rem;\n    width: 0.375rem;\n    ",
        ";\n  }\n",
      ]
    )),
  function (props) {
    return props.checked
      ? props.theme.inputs.checked.fontColor
      : props.theme.inputs.bgd;
  },
  function (props) {
    return props.theme.radii.circle;
  },
  absoluteCenter
);
var StyledRadioIcon = styled__default["default"](StyledRadio)(
  templateObject_5$2 ||
    (templateObject_5$2 = __makeTemplateObject$k(
      [
        "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.5rem;\n  border-color: ",
        ";\n  box-shadow: none;\n  margin: 0.1rem;\n\n  ",
        ":checked ~ & {\n    svg {\n      stroke: ",
        ";\n    }\n  }\n",
      ],
      [
        "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.5rem;\n  border-color: ",
        ";\n  box-shadow: none;\n  margin: 0.1rem;\n\n  ",
        ":checked ~ & {\n    svg {\n      stroke: ",
        ";\n    }\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.colors.greys.white;
  },
  HiddenRadio,
  function (props) {
    return props.theme.colors.greys.white;
  }
);
var templateObject_1$k,
  templateObject_2$c,
  templateObject_3$9,
  templateObject_4$5,
  templateObject_5$2;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1j =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1j =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1j.apply(this, arguments);
  };
var __rest$x =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Radio = function (props) {
  var value = props.value,
    checked = props.checked,
    label = props.label,
    icon = props.icon,
    onChange = props.onChange,
    rest = __rest$x(props, ["value", "checked", "label", "icon", "onChange"]);
  var radioNode = React.useRef(null);
  var labelId = useUniqueId();
  var handleChange = function () {
    var _a, _b;
    (_a = radioNode.current) === null || _a === void 0 ? void 0 : _a.click(); // simulate click the native checkbox
    (_b = radioNode.current) === null || _b === void 0 ? void 0 : _b.focus();
  };
  return React__default["default"].createElement(
    StyledRadioWrapper,
    { className: "ch-radio-wrapper" },
    React__default["default"].createElement(
      HiddenRadio,
      __assign$1j(
        {
          checked: checked,
          id: labelId,
          onChange: onChange,
          type: "radio",
          value: value,
          ref: radioNode,
          "data-testid": "hidden-radio",
          "aria-label": label,
        },
        rest
      )
    ),
    icon
      ? React__default["default"].createElement(
          React__default["default"].Fragment,
          null,
          React__default["default"].createElement(
            StyledRadioIcon,
            {
              checked: checked,
              className: "ch-radio",
              onClick: handleChange,
              "data-testid": "styled-radio-icon",
            },
            React__default["default"].createElement(
              "span",
              { className: "ch-icon" },
              icon
            )
          )
        )
      : React__default["default"].createElement(
          React__default["default"].Fragment,
          null,
          React__default["default"].createElement(StyledRadioLabel, {
            checked: checked,
            className: "ch-radio",
            onClick: handleChange,
            "data-testid": "styled-radio",
          }),
          React__default["default"].createElement(
            Label,
            { htmlFor: labelId, className: "ch-radio-label" },
            label
          )
        )
  );
};
Radio.displayName = "Radio";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1k =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1k =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1k.apply(this, arguments);
  };
var RadioGroup = function (props) {
  var options = props.options,
    value = props.value,
    onChange = props.onChange;
  return React__default["default"].createElement(
    React__default["default"].Fragment,
    null,
    options.map(function (option, index) {
      return React__default["default"].createElement(
        Radio,
        __assign$1k(
          {
            value: option.value,
            key: option + "-" + index,
            label: option.label,
            checked: option.value === value,
            icon: option.icon,
            onChange: onChange,
          },
          option.inputProps
        )
      );
    })
  );
};
RadioGroup.displayName = "RadioGroup";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$l =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledWrapper = styled__default["default"].div(
  templateObject_1$l ||
    (templateObject_1$l = __makeTemplateObject$l(
      [
        "\n  position: relative;\n\n  .ch-select-icon {\n    pointer-events: none;\n  }\n",
      ],
      [
        "\n  position: relative;\n\n  .ch-select-icon {\n    pointer-events: none;\n  }\n",
      ]
    ))
);
var StyledSelectInput = styled__default["default"].select(
  templateObject_2$d ||
    (templateObject_2$d = __makeTemplateObject$l(
      [
        "\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  color: ",
        ";\n  font-size: ",
        ";\n  line-height: ",
        ';\n  height: 2rem;\n  letter-spacing: -0.005625rem;\n  width: 100%;\n  padding: 0.375rem 1.5rem 0.375rem 0.5rem;\n  transition: box-shadow 0.05s ease-in;\n  display: inline-block;\n  appearance: none;\n\n  &:focus,\n  &[aria-invalid="true"]:focus {\n    border: ',
        ";\n    box-shadow: ",
        ';\n    outline: none;\n  }\n\n  &[aria-invalid="true"] {\n    border: ',
        ";\n    box-shadow: ",
        ";\n  }\n",
      ],
      [
        "\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  color: ",
        ";\n  font-size: ",
        ";\n  line-height: ",
        ';\n  height: 2rem;\n  letter-spacing: -0.005625rem;\n  width: 100%;\n  padding: 0.375rem 1.5rem 0.375rem 0.5rem;\n  transition: box-shadow 0.05s ease-in;\n  display: inline-block;\n  appearance: none;\n\n  &:focus,\n  &[aria-invalid="true"]:focus {\n    border: ',
        ";\n    box-shadow: ",
        ';\n    outline: none;\n  }\n\n  &[aria-invalid="true"] {\n    border: ',
        ";\n    box-shadow: ",
        ";\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.inputs.bgd;
  },
  function (props) {
    return props.theme.inputs.border;
  },
  function (props) {
    return props.theme.inputs.borderRadius;
  },
  function (props) {
    return props.theme.inputs.shadow;
  },
  function (props) {
    return props.theme.inputs.fontColor;
  },
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.fontSizes.text.lineHeight;
  },
  function (props) {
    return props.theme.inputs.focus.border;
  },
  function (props) {
    return props.theme.inputs.focus.shadow;
  },
  function (props) {
    return props.theme.inputs.error.border;
  },
  function (props) {
    return props.theme.inputs.error.shadow;
  }
);
var templateObject_1$l, templateObject_2$d;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1l =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1l =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1l.apply(this, arguments);
  };
var renderOptions = function (options) {
  return options.map(function (_a) {
    var value = _a.value,
      label = _a.label;
    return React__default["default"].createElement(
      "option",
      { key: value, value: value },
      label
    );
  });
};
var upAndDownCaretStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "0.2rem",
  width: "1.5rem",
  height: "1.5rem",
};
var Select = React.forwardRef(function (props, ref) {
  return React__default["default"].createElement(
    StyledWrapper,
    null,
    React__default["default"].createElement(
      StyledSelectInput,
      __assign$1l(
        { className: "ch-select", "data-testid": "select", ref: ref },
        props
      ),
      renderOptions(props.options)
    ),
    React__default["default"].createElement(UpAndDownCaret, {
      style: upAndDownCaretStyle,
      className: "ch-select-icon",
      "data-testid": "select-icon",
    })
  );
});
Select.displayName = "Select";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$m =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledTextarea = styled__default["default"].textarea(
  templateObject_1$m ||
    (templateObject_1$m = __makeTemplateObject$m(
      [
        "\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  color: ",
        ";\n  font-size: ",
        ';\n  padding: 0.5rem;\n  position: relative;\n  min-height: 4rem;\n  transition: box-shadow .05s ease-in;\n  width: 100%;\n\n  &:focus,\n  &[aria-invalid="true"]:focus {\n    border: ',
        ";\n    box-shadow: ",
        ';\n    outline: none;\n  }\n\n  &[aria-invalid="true"] {\n    border: ',
        ";\n    box-shadow: ",
        ";\n  }\n",
      ],
      [
        "\n  background-color: ",
        ";\n  border: ",
        ";\n  border-radius: ",
        ";\n  box-shadow: ",
        ";\n  color: ",
        ";\n  font-size: ",
        ';\n  padding: 0.5rem;\n  position: relative;\n  min-height: 4rem;\n  transition: box-shadow .05s ease-in;\n  width: 100%;\n\n  &:focus,\n  &[aria-invalid="true"]:focus {\n    border: ',
        ";\n    box-shadow: ",
        ';\n    outline: none;\n  }\n\n  &[aria-invalid="true"] {\n    border: ',
        ";\n    box-shadow: ",
        ";\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.inputs.bgd;
  },
  function (props) {
    return props.theme.inputs.border;
  },
  function (props) {
    return props.theme.inputs.borderRadius;
  },
  function (props) {
    return props.theme.inputs.shadow;
  },
  function (props) {
    return props.theme.inputs.fontColor;
  },
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.inputs.focus.border;
  },
  function (props) {
    return props.theme.inputs.focus.shadow;
  },
  function (props) {
    return props.theme.inputs.error.border;
  },
  function (props) {
    return props.theme.inputs.error.shadow;
  }
);
var templateObject_1$m;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1m =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1m =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1m.apply(this, arguments);
  };
var __rest$y =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Textarea = function (_a) {
  var label = _a.label,
    props = __rest$y(_a, ["label"]);
  return React__default["default"].createElement(
    StyledTextarea,
    __assign$1m(
      {
        "aria-label": label,
        className: "ch-textarea",
        "data-testid": "textarea",
      },
      props
    )
  );
};
Textarea.displayName = "Textarea";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$n =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var sortedRatios = [
  "slim",
  "r1by2",
  "r2by3",
  "r1by1",
  "r4by3",
  "r3by2",
  "r16by9",
];

var ratioStyles = {
  1: "grid-template: 1fr / 1fr;",
  "1.slim": "grid-template: repeat(2, 1fr) / 1fr;",
  "1.r2by3": "grid-template: 1fr / 1fr;",

  "1.featured": `grid-template: "ft" 1fr / 1fr;`,

  2: "grid-template: 1fr / repeat(2,1fr);",
  "2.slim": `grid-template-areas: 'ft ft' 'ft ft';`, //`grid-template: repeat(3,1fr) / 1fr;`,
  "2.featured": `grid-template-areas: 'ft ft' 'ft ft';`, // grid-template: repeat(3,1fr) / repeat(2,1fr)

  "2.r1by2": "grid-template: repeat(2,1fr) / 1fr;",
  "2.r2by3": "grid-template: repeat(2,1fr) / 1fr;",
  "2.r4by3": "grid-template: repeat(2,1fr) / repeat(2,1fr);",
  "2.r16by9": `grid-template: 1fr / repeat(2,1fr);`,

  "2.r16by9.featured": `grid-template: repeat(2,1fr) / repeat(3,1fr);
      grid-template-areas: 'ft ft v' 'ft ft v' 'ft ft v';`,

  3: "grid-template: repeat(3,1fr) / 1fr;",
  "3.r2by3": "grid-template: repeat(3,1fr) / repeat(1,1fr);",
  "3.r1by1": "grid-template: repeat(2,1fr) / repeat(2,1fr);",

  "3.featured": `grid-template-areas: 'ft ft' 'ft ft';`, // grid-template: repeat(3,1fr) / repeat(2,1fr);
  "3.r16by9.featured": `grid-template: repeat(2,1fr) / repeat(3,1fr);
      grid-template-areas: 'ft ft v' 'ft ft v';`,

  4: "grid-template: repeat(2,1fr) / repeat(2,1fr);",
  "4.slim": `grid-template-areas: 'ft ft' 'ft ft';`, // "grid-template: repeat(4,1fr) / 1fr;",
  "4.r2by3": "grid-template: repeat(2,1fr) / repeat(2,1fr);",

  "4.featured": `grid-template: repeat(3,1fr) / repeat(3,1fr);
      grid-template-areas: 'ft ft ft' 'ft ft ft';`,
  "4.r16by9.featured": `grid-template-areas: 'ft ft v' 'ft ft v' 'ft ft v';`,

  5: "grid-template: repeat(2,1fr) / repeat(3,1fr);",
  "5.slim": "grid-template: repeat(5,1fr) / 1fr;",
  "5.r1by2": "grid-template: repeat(3,1fr) / repeat(2,1fr);",
  "5.r2by3": "grid-template: repeat(3,1fr) / repeat(2,1fr);",
  "5.r3by2": "grid-template: repeat(2,1fr) / repeat(3,1fr);",
  "5.r16by9": `grid-template: repeat(2,1fr) / repeat(3,1fr);`,

  "5.featured": `grid-template: repeat(4,1fr) / repeat(2,1fr);
      grid-template-areas: 'ft ft' 'ft ft';`,
  "5.r1by1.featured": `grid-template: repeat(3,1fr) / repeat(3,1fr);
      grid-template-areas: 'ft ft v' 'ft ft v';`,

  6: "grid-template: repeat(3,1fr) / repeat(3,1fr);",
  "6.slim": "grid-template: repeat(4,1fr) / repeat(2,1fr);",
  "6.r1by2": "grid-template: repeat(3,1fr) / repeat(2,1fr);",
  "6.r1by1": "grid-template: repeat(3,1fr) / repeat(2,1fr);",
  "6.r2by3": "grid-template: repeat(3,1fr) / repeat(2,1fr);",
  "6.r3by2": "grid-template: repeat(2,1fr) / repeat(3,1fr);",
  "6.r16by9": `grid-template: repeat(2,1fr) / repeat(3,1fr);`,

  "6.featured": `grid-template: repeat(4,1fr) / repeat(3,1fr);
      grid-template-areas: 'ft ft ft' 'ft ft ft';`,
  "6.r1by1.featured": `grid-template: repeat(3,1fr) / repeat(3,1fr);
      grid-template-areas: 'ft ft v' 'ft ft v';`,

  7: "grid-template: repeat(3,1fr) / repeat(3,1fr);",
  "7.slim": "grid-template: repeat(4,1fr) / repeat(2,1fr);",
  "7.r4by3": "grid-template: repeat(3,1fr) / repeat(3,1fr);",
  "7.r16by9": `grid-template: repeat(2,1fr) / repeat(4,1fr);`,

  "7.featured": `grid-template: repeat(4,1fr) / repeat(3,1fr);
      grid-template-areas: 'ft ft ft' 'ft ft ft';`,
  "7.r1by1.featured": `grid-template: repeat(4,1fr) / repeat(4,1fr);
      grid-template-areas: 'ft ft ft v' 'ft ft ft v' 'ft ft ft v';`,

  8: "grid-template: repeat(3,1fr) / repeat(3,1fr);",
  "8.slim": "grid-template: repeat(4,1fr) / repeat(2,1fr);",
  "8.r4by3": "grid-template: repeat(3,1fr) / repeat(3,1fr);",
  "8.r16by9": "grid-template: repeat(2,1fr) / repeat(4,1fr);",

  "8.featured": `grid-template: repeat(5,1fr) / repeat(4,1fr);
      grid-template-areas: 'ft ft ft ft ft' 'ft ft ft ft ft' 'ft ft ft ft ft';`,
  "8.r1by1.featured": `grid-template: repeat(4,1fr) / repeat(4,1fr);
      grid-template-areas: 'ft ft ft v' 'ft ft ft v' 'ft ft ft x';`,
  "8.r16by9.featured": `grid-template-areas: 'ft ft ft v' 'ft ft ft v' 'ft ft ft x';`,

  9: "grid-template: repeat(3,1fr) / repeat(3,1fr);",
  "9.slim": `grid-template: repeat(5,1fr) / repeat(2,1fr);`,
  "9.r1by1": "grid-template: repeat(3,1fr) / repeat(3,1fr);",
  "9.r16by9": `grid-template: repeat(3,1fr) / repeat(4,1fr);`,

  "9.featured": `grid-template: repeat(5,1fr) / repeat(4,1fr);
      grid-template-areas: 'ft ft ft ft ft' 'ft ft ft ft ft' 'ft ft ft ft ft';`,
  "9.r1by1.featured": `grid-template: repeat(5,1fr) / repeat(5,1fr);
      grid-template-areas: 'ft ft ft ft v' 'ft ft ft ft v' 'ft ft ft ft v' 'ft ft ft ft v';`,

  10: "grid-template: repeat(4,1fr) / repeat(3,1fr);",
  "10.slim": `grid-template: repeat(5,1fr) / repeat(2,1fr);`,
  "10.r1by1": "grid-template: repeat(4,1fr) / repeat(3,1fr);",
  "10.r3by2": "grid-template: repeat(3,1fr) / repeat(4,1fr);",

  "10.featured": `grid-template: repeat(5,1fr) / repeat(4,1fr);
      grid-template-areas: 'ft ft ft ft ft' 'ft ft ft ft ft' 'ft ft ft ft ft';`,
  "10.r1by1.featured": `grid-template: repeat(5,1fr) / repeat(5,1fr);
      grid-template-areas: 'ft ft ft ft v' 'ft ft ft ft v' 'ft ft ft ft v' 'ft ft ft ft v';`,

  11: "grid-template: repeat(4,1fr) / repeat(3,1fr);",
  "11.slim": "grid-template: repeat(6,1fr) / repeat(2,1fr);",
  "11.r1by1": "grid-template: repeat(4,1fr) / repeat(3,1fr);",
  "11.r3by2": "grid-template: repeat(3,1fr) / repeat(4,1fr);",
  "11.r16by9": `grid-template: repeat(3,1fr) / repeat(4,1fr);`,

  "11.featured": `grid-template: repeat(6,1fr) / repeat(6,1fr);
      grid-template-areas: 'ft ft ft ft ft ft' 'ft ft ft ft ft ft' 'ft ft ft ft ft ft' 'ft ft ft ft ft ft';`,
  "11.r1by1.featured": `grid-template-areas:
        'ft ft ft ft ft v' 'ft ft ft ft ft v' 'ft ft ft ft ft v'
        'ft ft ft ft ft v' 'ft ft ft ft ft x';`,

  12: "grid-template: repeat(4,1fr) / repeat(3,1fr);",
  "12.slim": "grid-template: repeat(6,1fr) / repeat(2,1fr);",
  "12.r2by3": "grid-template: repeat(4,1fr) / repeat(3,1fr);",
  "12.r3by2": "grid-template: repeat(3,1fr) / repeat(4,1fr);",

  "12.featured": `grid-template: repeat(6,1fr) / repeat(6,1fr);
      grid-template-areas:
        'ft ft ft ft ft ft' 'ft ft ft ft ft ft' 'ft ft ft ft ft ft'
        'ft ft ft ft ft ft';`,
  "12.r1by1.featured": `grid-template-areas:
      'ft ft ft ft ft v' 'ft ft ft ft ft v' 'ft ft ft ft ft v'
      'ft ft ft ft ft v' 'ft ft ft ft ft x';`,

  13: "grid-template: repeat(4,1fr) / repeat(4,1fr);",
  "13.slim": "grid-template: repeat(7,1fr) / repeat(2,1fr);",
  "13.r2by3": "grid-template: repeat(5,1fr) / repeat(3,1fr);",
  "13.r1by1": "grid-template: repeat(4,1fr) / repeat(4,1fr);",
  "13.r3by2": "grid-template: repeat(4,1fr) / repeat(4,1fr);",
  "13.r16by9": `grid-template: repeat(3,1fr) / repeat(5,1fr);`,

  "13.featured": `grid-template: repeat(7,1fr) / repeat(6,1fr);
      grid-template-areas:
        'ft ft ft ft ft ft' 'ft ft ft ft ft ft' 'ft ft ft ft ft ft' 'ft ft ft ft ft ft'
        'ft ft ft ft ft ft';`,
  "13.r1by1.featured": `grid-template-areas:
        'ft ft ft ft ft v' 'ft ft ft ft ft v' 'ft ft ft ft ft v' 'ft ft ft ft ft v'
        'ft ft ft ft ft v' 'ft ft ft ft ft x';`,

  14: "grid-template: repeat(4,1fr) / repeat(4,1fr);",
  "14.slim": "grid-template: repeat(7,1fr) / repeat(2,1fr);",
  "14.r2by3": "grid-template: repeat(5,1fr) / repeat(3,1fr);",
  "14.r3by2": "grid-template: repeat(4,1fr) / repeat(4,1fr);",
  "14.r16by9": `grid-template: repeat(3,1fr) / repeat(5,1fr);`,

  "14.featured": `grid-template: repeat(7,1fr) / repeat(7,1fr);
      grid-template-areas:
        'ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft'
        'ft ft ft ft ft ft ft';`,
  "14.r1by1.featured": `grid-template-areas:
        'ft ft ft ft ft ft v' 'ft ft ft ft ft ft v' 'ft ft ft ft ft ft v' 'ft ft ft ft ft ft v'
        'ft ft ft ft ft ft v' 'ft ft ft ft ft ft x';`,

  15: "grid-template: repeat(5,1fr) / repeat(3,1fr);",
  "15.slim": "grid-template: repeat(8,1fr) / repeat(2,1fr);",
  "15.r1by2": "grid-template: repeat(5,1fr) / repeat(3,1fr);",
  "15.r3by2": "grid-template: repeat(4,1fr) / repeat(4,1fr);",
  "15.r16by9": `grid-template: repeat(3,1fr) / repeat(5,1fr);`,

  "15.featured": `grid-template: repeat(8,1fr) / repeat(8,1fr);
      grid-template-areas:
       'ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft'
       'ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft';`,
  "15.r1by1.featured": `grid-template-areas:
       'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft v'
       'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft x';`,

  16: "grid-template: repeat(4,1fr) / repeat(4,1fr);",
  "16.slim": "grid-template: repeat(8,1fr) / repeat(2,1fr);",
  "16.r1by2": "grid-template: repeat(6,1fr) / repeat(3,1fr);",
  "16.r1by1": "grid-template: repeat(4,1fr) / repeat(4,1fr);",

  "16.featured": `grid-template: repeat(8,1fr) / repeat(8,1fr);
      grid-template-areas:
        'ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft'
        'ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft';`,
  "16.r1by1.featured": `grid-template-areas:
        'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft v'
        'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft x';`,

  17: "grid-template: repeat(5,1fr) / repeat(4,1fr);",
  "17.slim": "grid-template: repeat(8,1fr) / repeat(3,1fr);",
  "17.r1by2": "grid-template: repeat(6,1fr) / repeat(4,1fr);",
  "17.r1by1": "grid-template: repeat(4,1fr) / repeat(5,1fr);",

  "17.featured": `grid-template: repeat(8,1fr) / repeat(9,1fr);
      grid-template-areas:
        'ft ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft ft'
        'ft ft ft ft ft ft ft ft ft' 'ft ft ft ft ft ft ft ft ft';`,
  "17.r1by1.featured": `grid-template-areas:
        'ft ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft ft v'
        'ft ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft ft v' 'ft ft ft ft ft ft ft ft x';`,
};

var responsiveStyles = {
  "2.featured": `
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-template-rows: calc(100% / 3);
        grid-auto-rows: calc(100% / 3);
      }
    `,

  "3.r16by9": `
      @media (max-height: 600px) {
        grid-template-rows: repeat(2,1fr);
        grid-template-columns: 50%;
        grid-auto-columns: 50%;
        grid-auto-flow: column;
      }
    `,

  "3.featured": `
      @media (max-width: 600px) {
        grid-template-areas: 'ft' 'ft';
        grid-template-columns: 1fr;
        grid-template-rows: 25%;
        grid-auto-rows: 25%;
      }
    `,

  "4.r16by9": `
      @media (max-height: 600px) {
        grid-template-rows: repeat(2,1fr);
        grid-template-columns: 50%;
        grid-auto-columns: 50%;
        grid-auto-flow: column;
      }
    `,

  "5.r16by9": `grid-template: repeat(2,1fr) / repeat(3,1fr);
      @media (max-height: 600px) {
        grid-template-rows: repeat(2,1fr);
        grid-template-columns: calc(100% / 3);
        grid-auto-columns: calc(100% / 3);
        grid-auto-flow: column;
      }
    `,

  "6.r16by9": `grid-template: repeat(2,1fr) / repeat(3,1fr);
      @media (max-height: 600px) {
        grid-template-rows: repeat(2,1fr);
        grid-template-columns: calc(100% / 3);
        grid-auto-columns: calc(100% / 3);
        grid-auto-flow: column;
      }
    `,

  "7.r16by9": `
      @media (max-height: 600px) {
        grid-template-rows: repeat(2,1fr);
        grid-template-columns: 25%;
        grid-auto-columns: 25%;
        grid-auto-flow: column;
      }
    `,
};

var portraitStyles = `
    @media (max-width: 600px) {
      grid-template-areas: 'ft ft' 'ft ft';
      grid-template-columns: repeat(2,1fr);
      grid-template-rows: 25%;
      grid-auto-rows: 25%;
    }
  `;

var landscapeStyles = `
    @media (max-height: 600px) {
      grid-template-areas: 'ft ft' 'ft ft';
      grid-template-rows: repeat(2,1fr);
      grid-template-columns: 25%;
      grid-auto-columns: 25%;
      grid-auto-flow: column;
    }
  `;
var StyledGrid = styled__default["default"].div(
  templateObject_1$n ||
    (templateObject_1$n = __makeTemplateObject$n(
      [
        "\n  position: relative;\n  display: grid;\n  height: 100%;\n  width: 100%;\n  overflow: auto;\n  background-color: ",
        ";\n\n  ",
        "\n  ",
        ";\n",
      ],
      [
        "\n  position: relative;\n  display: grid;\n  height: 100%;\n  width: 100%;\n  overflow: auto;\n  background-color: ",
        ";\n\n  ",
        "\n  ",
        ";\n",
      ]
    )),
  function (props) {
    return props.theme.videoGrid.bgd;
  },
  function (_a) {
    var size = _a.size,
      featured = _a.featured;
    return ratioStyles["" + size + (featured ? ".featured" : "")] || "";
  },
  function (_a) {
    var size = _a.size,
      featured = _a.featured,
      ratio = _a.ratio;
    if (!ratio) {
      return;
    }
    var styles = "";
    var index = sortedRatios.indexOf(ratio);
    for (var i = 0; i <= index; i++) {
      var currentRatio = sortedRatios[i];
      var baseStyles =
        ratioStyles[size + "." + currentRatio + (featured ? ".featured" : "")];
      styles += baseStyles || "";
    }
    var mobileStyles =
      responsiveStyles[size + "." + ratio + (featured ? ".featured" : "")] ||
      responsiveStyles["" + size + (featured ? ".featured" : "")];
    if (mobileStyles) {
      styles += mobileStyles;
    } else if (ratio === "r16by9" && (size > 7 || featured)) {
      styles += landscapeStyles;
    } else if (size > 7 || featured) {
      styles += portraitStyles;
    }
    return styles;
  }
);
var templateObject_1$n;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1n =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1n =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1n.apply(this, arguments);
  };
var __rest$z =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var gridData = { usingGrid: true };
var GridContext = React.createContext(null);
var VideoGrid = function (_a) {
  var size = _a.size,
    children = _a.children,
    _b = _a.layout,
    layout = _b === void 0 ? "featured" : _b,
    rest = __rest$z(_a, ["size", "children", "layout"]);
  var gridEl = React.createRef();
  var ratio = "slim"; //useElementAspectRatio(gridEl); // "slim"; //useElementAspectRatio(gridEl);
  var gridSize =
    typeof size === "number"
      ? size
      : React__default["default"].Children.count(children);
  return React__default["default"].createElement(
    GridContext.Provider,
    { value: gridData },
    React__default["default"].createElement(
      StyledGrid,
      __assign$1n({ ref: gridEl }, rest, {
        size: gridSize,
        ratio: ratio,
        featured: layout === "featured",
        "data-testid": "video-grid",
      }),
      children
    )
  );
};
var useGridData = function () {
  var gridData = React.useContext(GridContext);
  return gridData;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$o =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledVideoTile = styled__default["default"].div(
  templateObject_1$o ||
    (templateObject_1$o = __makeTemplateObject$o(
      [
        "\n  height: 100%;\n  width: 100%;\n  position: relative;\n  background: ",
        ";\n\n  video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    object-fit: ",
        "};\n  }\n\n  .ch-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: inline-block;\n    background-color: papayawhip; /* TODO: figure out what this is supposed to be */\n    margin-right: 0.5rem;\n    flex: 0 0 1.5rem;\n  }\n\n  .ch-nameplate {\n    backdrop-filter: blur(20px);\n    background-color: rgba(46, 47, 52, 0.85);\n    border-radius: 0.25rem;\n    bottom: 0.5rem;\n    color: ",
        ";\n    left: 0.5rem;\n    max-width: calc(100% - 2rem);\n    padding: 0.5rem;\n    position: absolute;\n\n    div {\n      ",
        ";\n      display: flex;\n      align-items: center;\n    }\n\n    .ch-text {\n      font-size: ",
        ";\n      ",
        ";\n      margin: 0;\n    }\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  height: 100%;\n  width: 100%;\n  position: relative;\n  background: ",
        ";\n\n  video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    object-fit: ",
        "};\n  }\n\n  .ch-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: inline-block;\n    background-color: papayawhip; /* TODO: figure out what this is supposed to be */\n    margin-right: 0.5rem;\n    flex: 0 0 1.5rem;\n  }\n\n  .ch-nameplate {\n    backdrop-filter: blur(20px);\n    background-color: rgba(46, 47, 52, 0.85);\n    border-radius: 0.25rem;\n    bottom: 0.5rem;\n    color: ",
        ";\n    left: 0.5rem;\n    max-width: calc(100% - 2rem);\n    padding: 0.5rem;\n    position: absolute;\n\n    div {\n      ",
        ";\n      display: flex;\n      align-items: center;\n    }\n\n    .ch-text {\n      font-size: ",
        ";\n      ",
        ";\n      margin: 0;\n    }\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.colors.greys.grey100;
  },
  function (props) {
    return props.objectFit || "cover";
  },
  function (props) {
    return props.theme.colors.greys.white;
  },
  ellipsis,
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  ellipsis,
  baseSpacing,
  baseStyles
);
var templateObject_1$o;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1o =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1o =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1o.apply(this, arguments);
  };
var __rest$A =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var VideoTile = React.forwardRef(function (props, ref) {
  var tag = props.tag,
    className = props.className,
    nameplate = props.nameplate,
    rest = __rest$A(props, ["tag", "className", "nameplate"]);
  return React__default["default"].createElement(
    StyledVideoTile,
    __assign$1o(
      { as: tag, className: className || "", "data-testid": "video-tile" },
      rest
    ),
    React__default["default"].createElement("video", {
      ref: ref,
      className: chimeStyles.chVideo,
    }),
    nameplate &&
      React__default["default"].createElement(
        "header",
        { className: "ch-nameplate" },
        React__default["default"].createElement(
          "p",
          { className: "ch-text" },
          nameplate
        )
      )
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$p =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledGrid$1 = styled__default["default"].div(
  templateObject_1$p ||
    (templateObject_1$p = __makeTemplateObject$p(
      [
        "\n  display: grid;\n  width: 100%;\n  height: 100%;\n\n  ",
        "\n  ",
        "\n  ",
        "\n\n  ",
        "\n\n  ",
        "\n",
      ],
      [
        "\n  display: grid;\n  width: 100%;\n  height: 100%;\n\n  ",
        "\n  ",
        "\n  ",
        "\n\n  ",
        "\n\n  ",
        "\n",
      ]
    )),
  styledSystem.grid,
  baseSpacing,
  baseStyles,
  function (_a) {
    var responsive = _a.responsive,
      theme = _a.theme;
    return responsive
      ? "\n    " +
          theme.mediaQueries.max.md +
          " {\n      grid-template-columns: 1fr 1fr;\n    }\n\n    " +
          theme.mediaQueries.max.sm +
          " {\n      grid-template-columns: 1fr;\n    }\n  "
      : "";
  },
  function (props) {
    return props.css || "";
  }
);
var StyledCell = styled__default["default"].div(
  templateObject_2$e ||
    (templateObject_2$e = __makeTemplateObject$p(
      ["\n  ", "\n  ", "\n\n  ", "\n"],
      ["\n  ", "\n  ", "\n\n  ", "\n"]
    )),
  baseSpacing,
  styledSystem.grid,
  function (props) {
    return props.css || "";
  }
);
var templateObject_1$p, templateObject_2$e;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1p =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1p =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1p.apply(this, arguments);
  };
var __rest$B =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Grid = function (_a) {
  var className = _a.className,
    tag = _a.tag,
    children = _a.children,
    rest = __rest$B(_a, ["className", "tag", "children"]);
  return React__default["default"].createElement(
    StyledGrid$1,
    __assign$1p({ as: tag, className: className || "" }, rest),
    children
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1q =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1q =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1q.apply(this, arguments);
  };
var __rest$C =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Cell = function (_a) {
  var className = _a.className,
    children = _a.children,
    rest = __rest$C(_a, ["className", "children"]);
  return React__default["default"].createElement(
    StyledCell,
    __assign$1q({ className: className || "" }, rest),
    children
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$q =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledRoster = styled__default["default"].div(
  templateObject_1$q ||
    (templateObject_1$q = __makeTemplateObject$q(
      [
        "\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  background-color: ",
        ";\n  box-shadow: 1rem 1rem 3.75rem 0 rgba(0, 0, 0, 0.1);\n  border-left: 0.0625rem solid ",
        ";\n  border-right: 0.0625rem solid ",
        ";\n\n  ",
        " {\n    width: ",
        ";\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  background-color: ",
        ";\n  box-shadow: 1rem 1rem 3.75rem 0 rgba(0, 0, 0, 0.1);\n  border-left: 0.0625rem solid ",
        ";\n  border-right: 0.0625rem solid ",
        ";\n\n  ",
        " {\n    width: ",
        ";\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.roster.bgd;
  },
  function (props) {
    return props.theme.roster.containerBorder;
  },
  function (props) {
    return props.theme.roster.containerBorder;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.min.md;
  },
  function (props) {
    return props.theme.roster.maxWidth;
  },
  baseSpacing,
  baseStyles
);
var StyledTitle = styled__default["default"].span(
  templateObject_2$f ||
    (templateObject_2$f = __makeTemplateObject$q(
      [
        "\n  display: inline-block;\n  margin: 0 0.625rem 0 0;\n  font-weight: 600;\n  font-size: 0.675rem;\n  color: ",
        ";\n",
      ],
      [
        "\n  display: inline-block;\n  margin: 0 0.625rem 0 0;\n  font-weight: 600;\n  font-size: 0.675rem;\n  color: ",
        ";\n",
      ]
    )),
  function (props) {
    return props.theme.roster.secondaryText;
  }
);
var StyledGroupWrapper = styled__default["default"].div(
  templateObject_3$a ||
    (templateObject_3$a = __makeTemplateObject$q(
      [
        "\n  margin: 0 0.5rem;\n\n  & + & {\n    margin-top: 1rem;\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  margin: 0 0.5rem;\n\n  & + & {\n    margin-top: 1rem;\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  baseSpacing,
  baseStyles
);
var StyledGroup = styled__default["default"].div(
  templateObject_4$6 ||
    (templateObject_4$6 = __makeTemplateObject$q(
      [
        "\n  background-color: ",
        ";\n  border-radius: ",
        ";\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  background-color: ",
        ";\n  border-radius: ",
        ";\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.roster.fgd;
  },
  function (props) {
    return props.theme.radii.default;
  },
  baseSpacing,
  baseStyles
);
var StyledHeader$1 = styled__default["default"].div(
  templateObject_5$3 ||
    (templateObject_5$3 = __makeTemplateObject$q(
      [
        "\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding: 0.75rem 1rem;\n  border-bottom: 0.0625rem solid ",
        ";\n\n  .ch-title {\n    font-size: 0.875rem;\n    color: ",
        ";\n    ",
        "\n    ",
        ";\n  }\n\n  .ch-badge {\n    margin-left: 0.5rem;\n    ",
        "\n  }\n\n  .ch-buttons {\n    margin-left: auto;\n    display: flex;\n\n    > * {\n      margin-left: 0.5rem;\n    }\n\n    ",
        "\n  }\n\n  .ch-search-wrapper {\n    position: absolute !important;\n    bottom: 0.75rem;\n    left: 0.5rem;\n    right: 0.5rem;\n\n    .ch-search-input {\n      flex: 1;\n\n      input {\n        width: 100%;\n      }\n    }\n\n    .ch-search-close {\n      margin-left: 0.5rem;\n    }\n  }\n\n  .ch-navigation-icon {\n    margin-right: 0.5rem;\n    margin-left: -0.5rem;\n\n    ",
        " {\n      display: none;\n    }\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding: 0.75rem 1rem;\n  border-bottom: 0.0625rem solid ",
        ";\n\n  .ch-title {\n    font-size: 0.875rem;\n    color: ",
        ";\n    ",
        "\n    ",
        ";\n  }\n\n  .ch-badge {\n    margin-left: 0.5rem;\n    ",
        "\n  }\n\n  .ch-buttons {\n    margin-left: auto;\n    display: flex;\n\n    > * {\n      margin-left: 0.5rem;\n    }\n\n    ",
        "\n  }\n\n  .ch-search-wrapper {\n    position: absolute !important;\n    bottom: 0.75rem;\n    left: 0.5rem;\n    right: 0.5rem;\n\n    .ch-search-input {\n      flex: 1;\n\n      input {\n        width: 100%;\n      }\n    }\n\n    .ch-search-close {\n      margin-left: 0.5rem;\n    }\n  }\n\n  .ch-navigation-icon {\n    margin-right: 0.5rem;\n    margin-left: -0.5rem;\n\n    ",
        " {\n      display: none;\n    }\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.roster.headerBorder;
  },
  function (props) {
    return props.theme.roster.primaryText;
  },
  function (props) {
    return props.isSearching ? "opacity: 0;" : "";
  },
  ellipsis,
  function (props) {
    return props.isSearching ? "opacity: 0;" : "";
  },
  function (props) {
    return props.isSearching ? "opacity: 0;" : "";
  },
  function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.min.md;
  },
  baseSpacing,
  baseStyles
);
var StyledName = styled__default["default"].div(
  templateObject_6$1 ||
    (templateObject_6$1 = __makeTemplateObject$q(
      [
        "\n  flex-grow: 1;\n  min-width: 0;\n  line-height: 1.5;\n\n  .ch-name {\n    ",
        ";\n    white-space:  break-spaces;\n    font-size: 0.875rem;\n    color: ",
        ";\n  }\n\n  .ch-subtitle {\n    ",
        ";\n    font-size: 0.65rem;\n    color: ",
        ";\n  }\n",
      ],
      [
        "\n  flex-grow: 1;\n  min-width: 0;\n  line-height: 1.5;\n\n  .ch-name {\n    ",
        ";\n    white-space:  break-spaces;\n    font-size: 0.875rem;\n    color: ",
        ";\n  }\n\n  .ch-subtitle {\n    ",
        ";\n    font-size: 0.65rem;\n    color: ",
        ";\n  }\n",
      ]
    )),
  ellipsis,
  function (props) {
    return props.theme.roster.primaryText;
  },
  ellipsis,
  function (props) {
    return props.theme.roster.secondaryText;
  }
);
var templateObject_1$q,
  templateObject_2$f,
  templateObject_3$a,
  templateObject_4$6,
  templateObject_5$3,
  templateObject_6$1;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1r =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1r =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1r.apply(this, arguments);
  };
var __rest$D =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var Roster = function (_a) {
  var children = _a.children,
    rest = __rest$D(_a, ["children"]);
  return React__default["default"].createElement(
    StyledRoster,
    __assign$1r({}, rest),
    children
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1s =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1s =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1s.apply(this, arguments);
  };
var PopOverMenu = function (_a) {
  var menu = _a.menu,
    _b = _a.a11yMenuLabel,
    a11yMenuLabel = _b === void 0 ? "" : _b,
    buttonProps = _a.buttonProps;
  return React__default["default"].createElement(
    PopOver,
    {
      className: "ch-menu",
      a11yLabel: a11yMenuLabel,
      renderButtonWrapper: function (isActive, props) {
        return React__default["default"].createElement(
          IconButton,
          __assign$1s({}, buttonProps, props, {
            className: classnames(
              "ch-menu",
              buttonProps === null || buttonProps === void 0
                ? void 0
                : buttonProps.className
            ),
            icon: React__default["default"].createElement(Dots, null),
            label: a11yMenuLabel,
          })
        );
      },
    },
    menu
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1t =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1t =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1t.apply(this, arguments);
  };
var __rest$E =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var SearchBar = function (_a) {
  var onChange = _a.onChange,
    onClose = _a.onClose,
    value = _a.value;
  var inputEl = React.useRef(null);
  var handleClear = function () {
    var _a;
    var input = inputEl.current;
    var nativeSetter =
      (_a = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )) === null || _a === void 0
        ? void 0
        : _a.set;
    if (nativeSetter && input) {
      nativeSetter.call(input, "");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    onClose();
  };
  React.useEffect(function () {
    var _a;
    (_a = inputEl.current) === null || _a === void 0 ? void 0 : _a.focus();
  }, []);
  return React__default["default"].createElement(
    Flex,
    { container: true, alignItems: "center", className: "ch-search-wrapper" },
    React__default["default"].createElement(SearchInput, {
      "aria-label": "Search",
      className: "ch-search-input",
      ref: inputEl,
      onChange: onChange,
      value: value,
      onClear: handleClear,
    })
  );
};
var RosterHeader = function (_a) {
  var tag = _a.tag,
    title = _a.title,
    badge = _a.badge,
    searchValue = _a.searchValue,
    onClose = _a.onClose,
    onSearch = _a.onSearch,
    className = _a.className,
    menu = _a.menu,
    _b = _a.a11yMenuLabel,
    a11yMenuLabel = _b === void 0 ? "" : _b,
    _c = _a.searchLabel,
    searchLabel = _c === void 0 ? "Open search" : _c,
    children = _a.children,
    rest = __rest$E(_a, [
      "tag",
      "title",
      "badge",
      "searchValue",
      "onClose",
      "onSearch",
      "className",
      "menu",
      "a11yMenuLabel",
      "searchLabel",
      "children",
    ]);
  var _d = React.useState(false),
    isSearching = _d[0],
    setIsSearching = _d[1];
  var searchBtn = React.useRef(null);
  var openSearch = function () {
    setIsSearching(true);
  };
  var closeSearch = function () {
    var _a;
    onSearch === null || onSearch === void 0
      ? void 0
      : onSearch({
          target: {
            value: "",
          },
          currentTarget: {
            value: "",
          },
        });
    setIsSearching(false);
    (_a = searchBtn.current) === null || _a === void 0 ? void 0 : _a.focus();
  };
  return React__default["default"].createElement(
    StyledHeader$1,
    __assign$1t(
      { isSearching: isSearching, as: tag, className: className || "" },
      rest
    ),
    React__default["default"].createElement(
      "div",
      { className: "ch-title" },
      title
    ),
    typeof badge === "number" &&
      badge > -1 &&
      React__default["default"].createElement(Badge, {
        className: "ch-badge",
        value: badge,
      }),
    React__default["default"].createElement(
      "div",
      { className: "ch-buttons" },
      onSearch &&
        React__default["default"].createElement(IconButton, {
          ref: searchBtn,
          label: searchLabel,
          onClick: openSearch,
          icon: React__default["default"].createElement(Search, null),
        }),
      menu &&
        React__default["default"].createElement(PopOverMenu, {
          menu: menu,
          a11yMenuLabel: a11yMenuLabel,
        }),
      children,
      onClose &&
        React__default["default"].createElement(IconButton, {
          label: "Close",
          onClick: onClose,
          icon: React__default["default"].createElement(Remove, null),
        })
    ),
    isSearching &&
      React__default["default"].createElement(SearchBar, {
        value: searchValue,
        onClose: closeSearch,
        onChange: onSearch,
      })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1u =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1u =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1u.apply(this, arguments);
  };
var __rest$F =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var RosterGroup = function (_a) {
  var tag = _a.tag,
    title = _a.title,
    badge = _a.badge,
    className = _a.className,
    children = _a.children,
    rest = __rest$F(_a, ["tag", "title", "badge", "className", "children"]);
  return React__default["default"].createElement(
    StyledGroupWrapper,
    __assign$1u({ as: tag, className: className || "" }, rest),
    title &&
      React__default["default"].createElement(
        Flex,
        { alignItems: "center", pl: ".5rem", mb: ".5rem" },
        React__default["default"].createElement(StyledTitle, null, title),
        typeof badge === "number" &&
          badge > -1 &&
          React__default["default"].createElement(Badge, { value: badge })
      ),
    React__default["default"].createElement(StyledGroup, null, children)
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$r =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledCell$1 = styled__default["default"].div(
  templateObject_1$r ||
    (templateObject_1$r = __makeTemplateObject$r(
      [
        "\n  display: flex;\n  align-items: center;\n  padding: 0.625rem 1rem;\n\n  .ch-mic {\n    flex-shrink: 0;\n    width: 1.5rem;\n    line-height: 0;\n\n    ",
        "\n  }\n\n  .ch-menu {\n    color: ",
        ";\n\n    &:hover,\n    &:focus {\n      color: ",
        ";\n    }\n  }\n\n  svg {\n    width: 1.5rem;\n    flex-shrink: 0;\n  }\n\n  > * {\n    margin-right: 0.5rem;\n  }\n\n  > :last-child {\n    margin-right: 0;\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  display: flex;\n  align-items: center;\n  padding: 0.625rem 1rem;\n\n  .ch-mic {\n    flex-shrink: 0;\n    width: 1.5rem;\n    line-height: 0;\n\n    ",
        "\n  }\n\n  .ch-menu {\n    color: ",
        ";\n\n    &:hover,\n    &:focus {\n      color: ",
        ";\n    }\n  }\n\n  svg {\n    width: 1.5rem;\n    flex-shrink: 0;\n  }\n\n  > * {\n    margin-right: 0.5rem;\n  }\n\n  > :last-child {\n    margin-right: 0;\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (_a) {
    var micPosition = _a.micPosition;
    return micPosition === "leading"
      ? "\n        order: -1;\n        margin-right: .75rem;\n      "
      : "";
  },
  function (props) {
    return props.theme.buttons.icon.hover.bgd;
  },
  function (props) {
    return props.theme.buttons.icon.hover.text;
  },
  baseSpacing,
  baseStyles
);
var StyledLateMessage = styled__default["default"].div(
  templateObject_2$g ||
    (templateObject_2$g = __makeTemplateObject$r(
      [
        "\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  font-size: 0.65rem;\n  color: ",
        ";\n\n  > svg {\n    margin-right: 0.25rem;\n    color: ",
        ";\n  }\n",
      ],
      [
        "\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  font-size: 0.65rem;\n  color: ",
        ";\n\n  > svg {\n    margin-right: 0.25rem;\n    color: ",
        ";\n  }\n",
      ]
    )),
  function (_a) {
    var theme = _a.theme;
    return theme.roster.secondaryText;
  },
  function (_a) {
    var theme = _a.theme;
    return theme.roster.secondaryText;
  }
);
var templateObject_1$r, templateObject_2$g;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var LateMessage = function (_a) {
  var children = _a.children;
  return React__default["default"].createElement(
    StyledLateMessage,
    null,
    React__default["default"].createElement(Clock, null),
    children
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var RosterName = function (_a) {
  var name = _a.name,
    subtitle = _a.subtitle;
  return React__default["default"].createElement(
    StyledName,
    null,
    React__default["default"].createElement(
      "div",
      { className: "ch-name" },
      name
    ),
    subtitle &&
      React__default["default"].createElement(
        "div",
        { className: "ch-subtitle" },
        subtitle
      )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1v =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1v =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1v.apply(this, arguments);
  };
function getVideoIcon(isVideoEnabled, isSharingContent) {
  if (isSharingContent) {
    return React__default["default"].createElement(ScreenShare, null);
  }
  if (typeof isVideoEnabled === "boolean") {
    return React__default["default"].createElement(Camera, {
      disabled: !isVideoEnabled,
    });
  }
  return null;
}
var RosterCell = function (props) {
  var tag = props.tag,
    name = props.name,
    menu = props.menu,
    subtitle = props.subtitle,
    className = props.className,
    runningLate = props.runningLate,
    muted = props.muted,
    videoEnabled = props.videoEnabled,
    sharingContent = props.sharingContent,
    _a = props.poorConnection,
    poorConnection = _a === void 0 ? false : _a,
    microphone = props.microphone,
    _b = props.a11yMenuLabel,
    a11yMenuLabel = _b === void 0 ? "" : _b,
    extraIcon = props.extraIcon,
    buttonProps = props.buttonProps;
  var videoIcon = getVideoIcon(videoEnabled, sharingContent);
  var showMic = typeof muted === "boolean";
  var mic =
    microphone ||
    React__default["default"].createElement(Microphone, {
      muted: muted,
      poorConnection: poorConnection,
    });
  return React__default["default"].createElement(
    StyledCell$1,
    __assign$1v({ className: className || "", as: tag }, props, {
      "data-testid": "roster-cell",
    }),
    React__default["default"].createElement(RosterName, {
      name: name,
      subtitle: subtitle,
    }),
    runningLate
      ? React__default["default"].createElement(LateMessage, null, runningLate)
      : React__default["default"].createElement(
          React__default["default"].Fragment,
          null,
          showMic &&
            React__default["default"].createElement(
              "div",
              { className: "ch-mic" },
              mic
            ),
          extraIcon,
          videoIcon
        ),
    menu &&
      React__default["default"].createElement(PopOverMenu, {
        menu: menu,
        a11yMenuLabel: a11yMenuLabel,
        buttonProps: buttonProps,
      })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$s =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledUserActivityManager = styled__default["default"].div(
  templateObject_1$s ||
    (templateObject_1$s = __makeTemplateObject$s(
      [
        "\n  z-index: ",
        ";\n  visibility: ",
        ";\n\n  &.ch-active {\n    animation: ",
        " 0.25s ease 0s forwards;\n  }\n",
      ],
      [
        "\n  z-index: ",
        ";\n  visibility: ",
        ";\n\n  &.ch-active {\n    animation: ",
        " 0.25s ease 0s forwards;\n  }\n",
      ]
    )),
  function (props) {
    return props.isActive ? props.theme.zIndex.controlBar : "-10";
  },
  function (props) {
    return props.isActive ? "visible" : "hidden";
  },
  fadeAnimation
);
var templateObject_1$s;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useFocusIn(el, delay) {
  if (delay === void 0) {
    delay = 3000;
  }
  var timeoutRef = React.useRef(null);
  var _a = React.useState(false),
    isFocused = _a[0],
    setIsFocused = _a[1];
  React.useEffect(
    function () {
      if (!el.current) {
        return;
      }
      var onFocusIn = function () {
        clearTimeout(timeoutRef.current);
        setIsFocused(true);
      };
      var onFocusOut = function () {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(function () {
          setIsFocused(false);
        }, delay);
      };
      el.current.addEventListener("focusin", onFocusIn);
      el.current.addEventListener("focusout", onFocusOut);
      return function () {
        el.current.removeEventListener("focusin", onFocusIn);
        el.current.removeEventListener("focusout", onFocusOut);
      };
    },
    [el]
  );
  return { isFocused: isFocused };
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useMouseMove(el, delay) {
  if (delay === void 0) {
    delay = 3000;
  }
  var timeoutRef = React.useRef(null);
  var _a = React.useState(false),
    isMouseMoving = _a[0],
    setIsMouseActive = _a[1];
  React.useEffect(
    function () {
      if (!el.current) {
        return;
      }
      var onMouseMove = function () {
        clearTimeout(timeoutRef.current);
        setIsMouseActive(true);
        timeoutRef.current = setTimeout(function () {
          setIsMouseActive(false);
        }, delay);
      };
      el.current.addEventListener("mousemove", onMouseMove);
      return function () {
        el.current.removeEventListener("mousemove", onMouseMove);
      };
    },
    [el]
  );
  return { isMouseMoving: isMouseMoving };
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var UserActivityContext = React.createContext(null);
var UserActivityProvider = function (_a) {
  var children = _a.children;
  var ref = React.useRef(null);
  var isFocused = useFocusIn(ref).isFocused;
  var isMouseMoving = useMouseMove(ref).isMouseMoving;
  var isUserActive = isFocused || isMouseMoving;
  var value = React.useMemo(
    function () {
      return {
        isUserActive: isUserActive,
      };
    },
    [isUserActive]
  );
  return React__default["default"].createElement(
    "div",
    { ref: ref },
    React__default["default"].createElement(
      UserActivityContext.Provider,
      { value: value },
      children
    )
  );
};
function useUserActivityState() {
  var state = React.useContext(UserActivityContext);
  if (!state) {
    throw new Error(
      "useUserActivityState must be used within an UserActivityContextProvider"
    );
  }
  return state;
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var UserActivityManager = function (_a) {
  var children = _a.children;
  var isUserActive = useUserActivityState().isUserActive;
  return React__default["default"].createElement(
    StyledUserActivityManager,
    {
      isActive: isUserActive,
      className: "" + (isUserActive ? "ch-active" : ""),
    },
    children
  );
};
UserActivityManager.displayName = "UserActivityManager";

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$t =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledChannelList = styled__default["default"].ul(
  templateObject_1$t ||
    (templateObject_1$t = __makeTemplateObject$t(
      [
        "\n  display: flex;\n  flex-direction: column;\n  width: 20rem;\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  display: flex;\n  flex-direction: column;\n  width: 20rem;\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  baseStyles,
  baseSpacing
);
var StyledChannelItem = styled__default["default"].li(
  templateObject_2$h ||
    (templateObject_2$h = __makeTemplateObject$t(
      [
        "\n  position: relative;\n\n  ",
        ";\n  ",
        ";\n\n  & .ch-channel-button {\n    width: 100%;\n    height: 100%;\n    padding: 11px 0;\n    background-color: ",
        ";\n    border: none;\n    border-radius: unset;\n    justify-content: left;\n    padding-left: 1rem;\n    color: ",
        ";\n    border: ",
        ";\n    font-family: ",
        ";\n\n    &:hover {\n      background-color: ",
        ";\n    }\n\n    &:active {\n      background-color: ",
        ";\n      color: ",
        ";\n    }\n\n    &:focus {\n      border: ",
        ";\n    }\n  }\n\n  & .ch-label {\n    padding-left: 1.5rem;\n  }\n\n  & .ch-unread-badge {\n    display: ",
        ";\n    position: absolute;\n    z-index: 2;\n    top: 12px;\n    left: 5px;\n    background-color: ",
        ";\n  }\n\n  &.ch-unread .ch-channel-button {\n    font-weight: bold;\n  }\n\n  &.ch-selected .ch-channel-button {\n    background-color: ",
        ";\n    color: ",
        ";\n\n    &:focus {\n      border: ",
        ";\n    }\n  }\n\n  & .ch-popover-toggle {\n    position: absolute;\n    right: 1rem;\n    margin: 0.5rem 0;\n    height: 1.5rem;\n    border-radius: 50%;\n\n    .ch-channel-actions {\n      border: 1px solid transparent;\n    }\n\n    & g {\n      fill: ",
        ";\n    }\n\n    & button:focus .ch-channel-actions {\n      border: ",
        ";\n      border-radius: 50%;\n    }\n\n    &:hover,\n    &:active {\n      background-color: ",
        ";\n\n      & g {\n        fill: ",
        ";\n      }\n    }\n  }\n",
      ],
      [
        "\n  position: relative;\n\n  ",
        ";\n  ",
        ";\n\n  & .ch-channel-button {\n    width: 100%;\n    height: 100%;\n    padding: 11px 0;\n    background-color: ",
        ";\n    border: none;\n    border-radius: unset;\n    justify-content: left;\n    padding-left: 1rem;\n    color: ",
        ";\n    border: ",
        ";\n    font-family: ",
        ";\n\n    &:hover {\n      background-color: ",
        ";\n    }\n\n    &:active {\n      background-color: ",
        ";\n      color: ",
        ";\n    }\n\n    &:focus {\n      border: ",
        ";\n    }\n  }\n\n  & .ch-label {\n    padding-left: 1.5rem;\n  }\n\n  & .ch-unread-badge {\n    display: ",
        ";\n    position: absolute;\n    z-index: 2;\n    top: 12px;\n    left: 5px;\n    background-color: ",
        ";\n  }\n\n  &.ch-unread .ch-channel-button {\n    font-weight: bold;\n  }\n\n  &.ch-selected .ch-channel-button {\n    background-color: ",
        ";\n    color: ",
        ";\n\n    &:focus {\n      border: ",
        ";\n    }\n  }\n\n  & .ch-popover-toggle {\n    position: absolute;\n    right: 1rem;\n    margin: 0.5rem 0;\n    height: 1.5rem;\n    border-radius: 50%;\n\n    .ch-channel-actions {\n      border: 1px solid transparent;\n    }\n\n    & g {\n      fill: ",
        ";\n    }\n\n    & button:focus .ch-channel-actions {\n      border: ",
        ";\n      border-radius: 50%;\n    }\n\n    &:hover,\n    &:active {\n      background-color: ",
        ";\n\n      & g {\n        fill: ",
        ";\n      }\n    }\n  }\n",
      ]
    )),
  baseStyles,
  baseSpacing,
  function (props) {
    return props.theme.channelList.bgd;
  },
  function (props) {
    return props.theme.channelList.fontColor;
  },
  function (props) {
    return props.theme.channelList.border;
  },
  function (props) {
    return props.theme.fonts.body;
  },
  function (props) {
    return props.theme.channelList.hover.bgd;
  },
  function (props) {
    return props.theme.channelList.active.bgd;
  },
  function (props) {
    return props.theme.channelList.active.fontColor;
  },
  function (props) {
    return props.theme.channelList.focus.border;
  },
  function (props) {
    return props.unread ? "inline" : "none";
  },
  function (props) {
    return props.theme.colors.primary.light;
  },
  function (props) {
    return props.theme.colors.primary.light;
  },
  function (props) {
    return props.theme.channelList.selected.fontColor;
  },
  function (props) {
    return props.theme.channelList.focus.selectedBorder;
  },
  function (props) {
    return props.theme.channelList.active.fontColor;
  },
  function (props) {
    return props.theme.channelList.focus.selectedBorder;
  },
  function (props) {
    return props.theme.channelList.iconButton.activeBgd;
  },
  function (props) {
    return props.theme.colors.primary.light;
  }
);
var templateObject_1$t, templateObject_2$h;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1w =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1w =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1w.apply(this, arguments);
  };
var ChannelList = function (props) {
  return React__default["default"].createElement(
    StyledChannelList,
    __assign$1w({}, props, { "data-testid": "channel-list" }),
    props.children
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1x =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1x =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1x.apply(this, arguments);
  };
var ChannelItem = function (props) {
  var name = props.name,
    actions = props.actions,
    isSelected = props.isSelected,
    onClick = props.onClick,
    unread = props.unread,
    unreadBadgeLabel = props.unreadBadgeLabel;
  return React__default["default"].createElement(
    StyledChannelItem,
    __assign$1x({}, props, {
      className: classnames({ "ch-selected": isSelected, "ch-unread": unread }),
    }),
    React__default["default"].createElement(Button, {
      className: "ch-channel-button",
      label: name,
      onClick: onClick,
    }),
    unread &&
      unreadBadgeLabel &&
      React__default["default"].createElement(Badge, {
        value: unreadBadgeLabel,
        className: "ch-unread-badge",
      }),
    actions &&
      isSelected &&
      React__default["default"].createElement(PopOver, {
        a11yLabel: "Open channel options",
        placement: "bottom-end",
        renderButton: function (isOpen) {
          return React__default["default"].createElement(Dots, {
            width: "1.5rem",
            height: "1.5rem",
            className: (isOpen ? "isOpen" : "") + " ch-channel-actions",
            "data-testid": "channel-actions",
          });
        },
        children: actions,
      })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$u =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledChatBubbleContainer = styled__default["default"].div(
  templateObject_1$u ||
    (templateObject_1$u = __makeTemplateObject$u(
      [
        "\n  display: flex;\n  flex-direction: row;\n  font-size: 0.65rem;\n  margin-left: 1rem;\n  align-items: center;\n  background-color: ",
        ";\n  width: 100%;\n\n  .ch-timestamp {\n    padding-right: ",
        ";\n  }\n\n  .ch-popover-toggle {\n    height: 1.5rem;\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  display: flex;\n  flex-direction: row;\n  font-size: 0.65rem;\n  margin-left: 1rem;\n  align-items: center;\n  background-color: ",
        ";\n  width: 100%;\n\n  .ch-timestamp {\n    padding-right: ",
        ";\n  }\n\n  .ch-popover-toggle {\n    height: 1.5rem;\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.chatBubble.container.bgd;
  },
  function (props) {
    return props.actions ? "1rem" : "2.5rem";
  },
  baseSpacing,
  baseStyles
);
var StyledChatBubble = styled__default["default"].div(
  templateObject_2$i ||
    (templateObject_2$i = __makeTemplateObject$u(
      [
        "\n  background-color: ",
        ";\n  padding: 0.625rem 1rem;\n  border-radius: 4px;\n  width: fit-content;\n  color: ",
        ";\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);\n  line-height: 20px;\n  width: ",
        ";\n  max-width: 70.6%;\n  font-size: 0.875rem;\n  position: relative;\n  margin-bottom: ",
        ";\n  overflow-wrap: break-word;\n  word-break: break-word;\n  hyphens: auto;\n\n  & .ch-sender-name {\n    font-weight: bold;\n    margin-bottom: 0.5rem;\n  }\n\n  & svg {\n    position: absolute;\n    height: 19px;\n    width: 11px;\n    margin-top: -14px;\n    margin-left: -25px;\n\n    & .ch-chat-bubble-tail {\n      fill: ",
        ";\n    }\n  }\n\n  .ch-input {\n    width: 100%;\n  }\n\n  .ch-edit-buttons {\n    position: absolute;\n    margin-top: 1rem;\n    display: flex;\n    flex-direction: row-reverse;\n    width: 10rem;\n    justify-content: space-between;\n  }\n\n  ",
        ";\n  ",
        ";\n",
      ],
      [
        "\n  background-color: ",
        ";\n  padding: 0.625rem 1rem;\n  border-radius: 4px;\n  width: fit-content;\n  color: ",
        ";\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);\n  line-height: 20px;\n  width: ",
        ";\n  max-width: 70.6%;\n  font-size: 0.875rem;\n  position: relative;\n  margin-bottom: ",
        ";\n  overflow-wrap: break-word;\n  word-break: break-word;\n  hyphens: auto;\n\n  & .ch-sender-name {\n    font-weight: bold;\n    margin-bottom: 0.5rem;\n  }\n\n  & svg {\n    position: absolute;\n    height: 19px;\n    width: 11px;\n    margin-top: -14px;\n    margin-left: -25px;\n\n    & .ch-chat-bubble-tail {\n      fill: ",
        ";\n    }\n  }\n\n  .ch-input {\n    width: 100%;\n  }\n\n  .ch-edit-buttons {\n    position: absolute;\n    margin-top: 1rem;\n    display: flex;\n    flex-direction: row-reverse;\n    width: 10rem;\n    justify-content: space-between;\n  }\n\n  ",
        ";\n  ",
        ";\n",
      ]
    )),
  function (props) {
    return props.theme.chatBubble[props.variant].bgd;
  },
  function (props) {
    return props.theme.chatBubble[props.variant].fontColor;
  },
  function (props) {
    return props.editable ? "100%" : "fit-content";
  },
  function (props) {
    return props.editable ? "4rem" : "unset";
  },
  function (props) {
    return props.theme.chatBubble[props.variant].bgd;
  },
  baseSpacing,
  baseStyles
);
var StyledChatBubbleInfo = styled__default["default"].div(
  templateObject_3$b ||
    (templateObject_3$b = __makeTemplateObject$u(
      [
        "\n  display: flex;\n  margin-right: 0.5rem;\n  margin-left: auto;\n  color: ",
        ";\n  align-items: center;\n\n  & .ch-message-actions {\n    border: 1px solid transparent;\n    border-radius: 50%;\n  }\n\n  & button:hover .ch-message-actions {\n    background-color: ",
        ";\n\n    & g {\n      fill: ",
        ";\n    }\n  }\n\n  & button:focus .ch-message-actions {\n    border: 1px solid ",
        ";\n    border-radius: 50%;\n  }\n\n  & .ch-message-actions g {\n    fill: ",
        ";\n  }\n\n  & .ch-message-actions.isOpen {\n    background-color: ",
        ";\n    border-radius: 50%;\n\n    & g {\n      fill: ",
        ";\n    }\n  }\n",
      ],
      [
        "\n  display: flex;\n  margin-right: 0.5rem;\n  margin-left: auto;\n  color: ",
        ";\n  align-items: center;\n\n  & .ch-message-actions {\n    border: 1px solid transparent;\n    border-radius: 50%;\n  }\n\n  & button:hover .ch-message-actions {\n    background-color: ",
        ";\n\n    & g {\n      fill: ",
        ";\n    }\n  }\n\n  & button:focus .ch-message-actions {\n    border: 1px solid ",
        ";\n    border-radius: 50%;\n  }\n\n  & .ch-message-actions g {\n    fill: ",
        ";\n  }\n\n  & .ch-message-actions.isOpen {\n    background-color: ",
        ";\n    border-radius: 50%;\n\n    & g {\n      fill: ",
        ";\n    }\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.chatBubble.container.fontColor;
  },
  function (props) {
    return props.theme.buttons.icon.hover.bgd;
  },
  function (props) {
    return props.theme.buttons.icon.hover.text;
  },
  function (props) {
    return props.theme.colors.primary.dark;
  },
  function (props) {
    return props.theme.chatBubble.container.fontColor;
  },
  function (props) {
    return props.theme.buttons.icon.active.bgd;
  },
  function (props) {
    return props.theme.buttons.icon.active.text;
  }
);
var templateObject_1$u, templateObject_2$i, templateObject_3$b;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1y =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1y =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1y.apply(this, arguments);
  };
var __rest$G =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ChatBubble = function (_a) {
  var variant = _a.variant,
    senderName = _a.senderName,
    content = _a.content,
    _b = _a.showName,
    showName = _b === void 0 ? true : _b,
    showTail = _a.showTail,
    redacted = _a.redacted,
    children = _a.children,
    rest = __rest$G(_a, [
      "variant",
      "senderName",
      "content",
      "showName",
      "showTail",
      "redacted",
      "children",
    ]);
  return React__default["default"].createElement(
    StyledChatBubble,
    __assign$1y({ variant: variant, editable: false }, rest, {
      "data-testid": "chat-bubble",
    }),
    showName &&
      React__default["default"].createElement(
        "div",
        { className: "ch-sender-name" },
        senderName
      ),
    React__default["default"].createElement("div", null, content),
    children,
    showTail &&
      React__default["default"].createElement(
        "svg",
        { viewBox: "0 0 4 9", "data-testid": "tail" },
        React__default["default"].createElement(
          "g",
          {
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd",
          },
          React__default["default"].createElement(
            "g",
            {
              transform: "translate(0, -53)",
              className: "ch-chat-bubble-tail",
            },
            React__default["default"].createElement("path", {
              d:
                "M4,62 L3.92789928,61.999999 C2.89671177,62.0004988 1.33197354,61.8123902 0.200755581,60.8250184 C-0.0781312712,60.5814641 -0.0639788041,60.0290387 0.229060515,59.8181428 C1.47198013,58.9247413 3.99237825,57.6821586 4,52.9112516 L4,52.9112516 L4,62 Z",
            })
          )
        )
      )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1z =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1z =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1z.apply(this, arguments);
  };
var __rest$H =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var EditableChatBubble = function (props) {
  var _a = props.showName,
    showName = _a === void 0 ? true : _a,
    variant = props.variant,
    senderName = props.senderName,
    content = props.content,
    showTail = props.showTail,
    cancel = props.cancel,
    _b = props.cancelLabel,
    cancelLabel = _b === void 0 ? "Cancel" : _b,
    save = props.save,
    _c = props.saveLabel,
    saveLabel = _c === void 0 ? "Save" : _c,
    rest = __rest$H(props, [
      "showName",
      "variant",
      "senderName",
      "content",
      "showTail",
      "cancel",
      "cancelLabel",
      "save",
      "saveLabel",
    ]);
  var _d = React.useState(content),
    text = _d[0],
    setText = _d[1];
  var inputEl = React.useRef(null);
  React.useEffect(function () {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, []);
  var handleChange = function (e) {
    e.preventDefault();
    setText(e.target.value);
  };
  return React__default["default"].createElement(
    StyledChatBubble,
    __assign$1z({ variant: variant, editable: true }, rest, {
      "data-testid": "editable-chat-bubble",
    }),
    showName &&
      React__default["default"].createElement(
        "div",
        { className: "ch-sender-name" },
        senderName
      ),
    React__default["default"].createElement(
      "form",
      {
        "data-testid": "form",
        onSubmit: function (e) {
          return save(e, text);
        },
      },
      React__default["default"].createElement(Input, {
        onChange: handleChange,
        value: text,
        showClear: false,
        ref: inputEl,
      }),
      React__default["default"].createElement(
        "div",
        { className: "ch-edit-buttons" },
        React__default["default"].createElement(PrimaryButton, {
          label: saveLabel,
          "data-testid": "save-button",
          onClick: function (e) {
            return save(e, text);
          },
        }),
        React__default["default"].createElement(SecondaryButton, {
          label: cancelLabel,
          onClick: cancel,
          "data-testid": "cancel-button",
        })
      )
    ),
    showTail &&
      React__default["default"].createElement(
        "svg",
        { viewBox: "0 0 4 9", "data-testid": "tail" },
        React__default["default"].createElement(
          "g",
          {
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd",
          },
          React__default["default"].createElement(
            "g",
            {
              transform: "translate(0, -53)",
              className: "ch-chat-bubble-tail",
            },
            React__default["default"].createElement("path", {
              d:
                "M4,62 L3.92789928,61.999999 C2.89671177,62.0004988 1.33197354,61.8123902 0.200755581,60.8250184 C-0.0781312712,60.5814641 -0.0639788041,60.0290387 0.229060515,59.8181428 C1.47198013,58.9247413 3.99237825,57.6821586 4,52.9112516 L4,52.9112516 L4,62 Z",
            })
          )
        )
      )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1A =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1A =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1A.apply(this, arguments);
  };
var __rest$I =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ChatBubbleContainer = function (props) {
  var timestamp = props.timestamp,
    actions = props.actions,
    rest = __rest$I(props, ["timestamp", "actions"]);
  return React__default["default"].createElement(
    StyledChatBubbleContainer,
    __assign$1A(
      { "data-testid": "chat-bubble-container", actions: actions },
      rest
    ),
    props.children,
    React__default["default"].createElement(
      StyledChatBubbleInfo,
      null,
      timestamp &&
        React__default["default"].createElement(
          "span",
          { className: "ch-timestamp", "data-testid": "message-time" },
          timestamp
        ),
      actions &&
        React__default["default"].createElement(PopOver, {
          a11yLabel: "Open channel options",
          placement: "bottom-end",
          renderButton: function (isOpen) {
            return React__default["default"].createElement(Dots, {
              width: "1.5rem",
              height: "1.5rem",
              className: (isOpen ? "isOpen" : "") + " ch-message-actions",
            });
          },
          children: actions,
        })
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$v =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
// Create the keyframes
var rotate = styled.keyframes(
  templateObject_1$v ||
    (templateObject_1$v = __makeTemplateObject$v(
      [
        "\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n",
      ],
      [
        "\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n",
      ]
    ))
);
var StyledInfiniteList = styled__default["default"].ul(
  templateObject_2$j ||
    (templateObject_2$j = __makeTemplateObject$v(
      [
        "\n  background-color: ",
        ";\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: column;\n  list-style: none;\n  padding: 0;\n\n  /* disable scrolling while fetching */\n  &.ch-not-scrollable {\n    overflow-y: hidden;\n  }\n\n  ",
        "\n  ",
        "\n\n  .ch-spinner {\n    margin: 0 auto;\n  }\n\n  .ch-spinner svg {\n    width: 2rem;\n    height: 2rem;\n    animation: ",
        " 2s linear infinite;\n    display: block;\n  }\n",
      ],
      [
        "\n  background-color: ",
        ";\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: column;\n  list-style: none;\n  padding: 0;\n\n  /* disable scrolling while fetching */\n  &.ch-not-scrollable {\n    overflow-y: hidden;\n  }\n\n  ",
        "\n  ",
        "\n\n  .ch-spinner {\n    margin: 0 auto;\n  }\n\n  .ch-spinner svg {\n    width: 2rem;\n    height: 2rem;\n    animation: ",
        " 2s linear infinite;\n    display: block;\n  }\n",
      ]
    )),
  function (props) {
    return props.theme.chatBubble.container.bgd;
  },
  baseSpacing,
  baseStyles,
  rotate
);
var templateObject_1$v, templateObject_2$j;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1B =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1B =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1B.apply(this, arguments);
  };
var InfiniteList = function (props) {
  var isLoading = props.isLoading,
    onLoad = props.onLoad,
    items = props.items;
  var listEnd = React.useRef(null);
  var currentTopItemRef = React.useRef(null);
  var firstNew = React.useRef(null);
  var prevLength = React.useRef(items.length);
  var newLength = React.useRef(0);
  var onLoadRef = React.useRef(onLoad);
  onLoadRef.current = onLoad;
  var _a = React.useState(false),
    atBottom = _a[0],
    setAtBottom = _a[1];
  React.useEffect(
    function () {
      var _a;
      (_a = firstNew.current) === null || _a === void 0
        ? void 0
        : _a.scrollIntoView();
    },
    [items.length]
  );
  var topObserver = new IntersectionObserver(
    function (entries) {
      var topEntry = entries[0];
      if (topEntry.isIntersecting) {
        onLoadRef.current();
      }
    },
    {
      threshold: 1,
    }
  );
  React.useEffect(function () {
    var _a;
    (_a = listEnd.current) === null || _a === void 0
      ? void 0
      : _a.scrollIntoView();
    if (currentTopItemRef.current) {
      topObserver.observe(currentTopItemRef.current);
    }
    return function () {
      if (currentTopItemRef.current) {
        topObserver.unobserve(currentTopItemRef.current);
      }
    };
  }, []);
  if (items.length !== prevLength.current) {
    prevLength.current = newLength.current;
  }
  newLength.current = items.length;
  var getRef = function (index) {
    if (index === newLength.current - 1) {
      return newBottom;
    } else if (
      index === items.length - prevLength.current - 1 &&
      isLoading &&
      items.length !== prevLength.current
    ) {
      return firstNew;
    } else {
      return null;
    }
  };
  var newBottom = React.useRef(null);
  var prevBottom;
  var messageList = items.map(function (item, i) {
    return React__default["default"].createElement(
      "li",
      {
        id: i.toString(),
        key: i,
        ref: i === 0 ? currentTopItemRef : getRef(i),
        role: "article",
      },
      item
    );
  });
  var bottomObserver = new IntersectionObserver(
    function (entries) {
      var entry = entries[0];
      setAtBottom(entry.isIntersecting);
    },
    {
      threshold: 0,
    }
  );
  React.useEffect(
    function () {
      if (atBottom && listEnd.current) {
        listEnd.current.scrollIntoView();
      }
      prevBottom = newBottom.current;
      if (prevBottom) {
        bottomObserver.unobserve(prevBottom);
      }
      if (newBottom.current) {
        bottomObserver.observe(newBottom.current);
        prevBottom = newBottom.current;
      }
      return function () {
        if (prevBottom) {
          bottomObserver.unobserve(prevBottom);
        }
      };
    },
    [items.length]
  );
  return React__default["default"].createElement(
    StyledInfiniteList,
    __assign$1B({}, props, {
      className: "" + (isLoading ? "ch-not-scrollable" : ""),
      "data-testid": "infinite-list",
      "aria-busy": isLoading ? true : false,
      role: "feed",
    }),
    isLoading &&
      React__default["default"].createElement(
        "li",
        { className: "ch-spinner" },
        React__default["default"].createElement(Spinner, null)
      ),
    messageList,
    React__default["default"].createElement("div", { ref: listEnd })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$w =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledMessageAttachmentContent = styled__default["default"].div(
  templateObject_1$w ||
    (templateObject_1$w = __makeTemplateObject$w(
      [
        "\n  color: ",
        ";\n  display: flex;\n  flex-direction: row;\n  width: fit-content;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);\n  background-color: ",
        ";\n  letter-spacing: ",
        ";\n  font-size: ",
        ";\n  line-height: ",
        ";\n\n  & .attachment-icon {\n    height: 2rem;\n    width: 2rem;\n    margin: auto;\n    background-color: ",
        ";\n    border-radius: 25px;\n\n    & .document-icon {\n      margin: auto 0;\n      color: ",
        ";\n    }\n  }\n  & .attachment-name {\n    margin-left: 1rem;\n\n    & a:link,\n    a:visited,\n    a:hover,\n    a:active {\n      color: ",
        ";\n      text-decoration: none;\n    }\n  }\n  & .attachment-size {\n    font-size: ",
        ";\n    color: ",
        ";\n    display: block;\n    padding-top: 3px;\n  }\n\n  ",
        "\n  ",
        "\n",
      ],
      [
        "\n  color: ",
        ";\n  display: flex;\n  flex-direction: row;\n  width: fit-content;\n  padding: 10px;\n  border-radius: 4px;\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);\n  background-color: ",
        ";\n  letter-spacing: ",
        ";\n  font-size: ",
        ";\n  line-height: ",
        ";\n\n  & .attachment-icon {\n    height: 2rem;\n    width: 2rem;\n    margin: auto;\n    background-color: ",
        ";\n    border-radius: 25px;\n\n    & .document-icon {\n      margin: auto 0;\n      color: ",
        ";\n    }\n  }\n  & .attachment-name {\n    margin-left: 1rem;\n\n    & a:link,\n    a:visited,\n    a:hover,\n    a:active {\n      color: ",
        ";\n      text-decoration: none;\n    }\n  }\n  & .attachment-size {\n    font-size: ",
        ";\n    color: ",
        ";\n    display: block;\n    padding-top: 3px;\n  }\n\n  ",
        "\n  ",
        "\n",
      ]
    )),
  function (props) {
    return props.theme.messageAttachment.content.fontColor;
  },
  function (props) {
    return props.theme.messageAttachment.content.bgd;
  },
  function (props) {
    return props.theme.messageAttachment.content.letterSpacing;
  },
  function (props) {
    return props.theme.fontSizes.text.fontSize;
  },
  function (props) {
    return props.theme.fontSizes.text.lineHeight;
  },
  function (props) {
    return props.theme.messageAttachment.icon.bgd;
  },
  function (props) {
    return props.theme.messageAttachment.icon.color;
  },
  function (props) {
    return props.theme.messageAttachment.name.fontColor;
  },
  function (props) {
    return props.theme.messageAttachment.size.fontSize;
  },
  function (props) {
    return props.theme.messageAttachment.size.fontColor;
  },
  baseSpacing,
  baseStyles
);
var templateObject_1$w;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1C =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1C =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1C.apply(this, arguments);
  };
var __rest$J =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var MessageAttachment = function (_a) {
  var _b = _a.size,
    size = _b === void 0 ? "Unknown" : _b,
    props = __rest$J(_a, ["size"]);
  var name = props.name,
    downloadUrl = props.downloadUrl;
  return React__default["default"].createElement(
    StyledMessageAttachmentContent,
    __assign$1C({}, props),
    React__default["default"].createElement(
      "div",
      { className: "attachment-icon" },
      React__default["default"].createElement(Document, {
        className: "document-icon",
        width: "2rem",
        height: "2rem",
      })
    ),
    React__default["default"].createElement(
      "div",
      { className: "attachment-name" },
      React__default["default"].createElement(
        "a",
        { target: "_blank", href: downloadUrl },
        name
      ),
      React__default["default"].createElement(
        "span",
        { className: "attachment-size" },
        size
      )
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var formatTime = function (time) {
  var t = new Date(time).toLocaleTimeString();
  return t.slice(0, t.length - 6) + t.slice(t.length - 3, t.length);
};

//
// Main
//

function memoize(fn, options) {
  var cache = options && options.cache ? options.cache : cacheDefault;

  var serializer =
    options && options.serializer ? options.serializer : serializerDefault;

  var strategy =
    options && options.strategy ? options.strategy : strategyDefault;

  return strategy(fn, {
    cache: cache,
    serializer: serializer,
  });
}

//
// Strategy
//

function isPrimitive(value) {
  return (
    value == null || typeof value === "number" || typeof value === "boolean"
  ); // || typeof value === "string" 'unsafe' primitive for our needs
}

function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);

  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);

  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}

function strategyDefault(fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  );
}

function strategyVariadic(fn, options) {
  var strategy = variadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  );
}

function strategyMonadic(fn, options) {
  var strategy = monadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  );
}

//
// Serializer
//

function serializerDefault() {
  return JSON.stringify(arguments);
}

//
// Cache
//

function ObjectWithoutPrototypeCache() {
  this.cache = Object.create(null);
}

ObjectWithoutPrototypeCache.prototype.has = function (key) {
  return key in this.cache;
};

ObjectWithoutPrototypeCache.prototype.get = function (key) {
  return this.cache[key];
};

ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
  this.cache[key] = value;
};

var cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  },
};

//
// API
//

var src = memoize;
var strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic,
};
src.strategies = strategies;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var formatDateUnmemoized = function (
  dateStr,
  locale,
  dateOptions,
  todayText,
  yesterdayText
) {
  var options = dateOptions
    ? dateOptions
    : { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  var date = new Date(dateStr).toLocaleDateString(locale, options);
  var today = new Date().toLocaleDateString(locale, options);
  var yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString(
    locale,
    options
  );
  if (date === yesterday) {
    return yesterdayText || "Yesterday";
  } else if (date === today) {
    return todayText || "Today";
  }
  return date;
};
var formatDate = src(formatDateUnmemoized);

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var DeviceInput = function (_a) {
  var onChange = _a.onChange,
    label = _a.label,
    devices = _a.devices,
    selectedDeviceId = _a.selectedDeviceId,
    notFoundMsg = _a.notFoundMsg;
  var outputOptions = devices.map(function (device) {
    return {
      value: device.deviceId,
      label: device.label,
    };
  });
  var options = outputOptions.length
    ? outputOptions
    : [
        {
          value: "not-available",
          label: notFoundMsg,
        },
      ];
  function selectDevice(e) {
    return __awaiter(this, void 0, void 0, function () {
      var deviceId;
      return __generator(this, function (_a) {
        deviceId = e.target.value;
        if (deviceId === "not-available") {
          return [2 /*return*/];
        }
        onChange(deviceId);
        return [2 /*return*/];
      });
    });
  }
  return React__default["default"].createElement(FormField, {
    field: Select,
    options: options,
    onChange: selectDevice,
    value: selectedDeviceId || "",
    label: label,
  });
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var AudioVideoContext = React.createContext(null);
var AudioVideoProvider = function (_a) {
  var children = _a.children;
  var meetingManager = useMeetingManager();
  var _b = React.useState(null),
    audioVideo = _b[0],
    setAudioVideo = _b[1];
  React.useEffect(function () {
    function audioVideoUpdateCb(av) {
      setAudioVideo(av);
    }
    meetingManager.subscribeToAudioVideo(audioVideoUpdateCb);
    return function () {
      return meetingManager.unsubscribeFromAudioVideo(audioVideoUpdateCb);
    };
  }, []);
  return React__default["default"].createElement(
    AudioVideoContext.Provider,
    { value: audioVideo },
    children
  );
};
var useAudioVideo = function () {
  var audioVideo = React.useContext(AudioVideoContext);
  return audioVideo;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1D =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1D =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1D.apply(this, arguments);
  };
var ContentActionType;
(function (ContentActionType) {
  ContentActionType[(ContentActionType["STARTING"] = 0)] = "STARTING";
  ContentActionType[(ContentActionType["DID_STOP"] = 1)] = "DID_STOP";
  ContentActionType[(ContentActionType["UPDATE"] = 2)] = "UPDATE";
  ContentActionType[(ContentActionType["TOGGLE_PAUSE"] = 3)] = "TOGGLE_PAUSE";
  ContentActionType[(ContentActionType["REMOVE"] = 4)] = "REMOVE";
  ContentActionType[(ContentActionType["DENIED"] = 5)] = "DENIED";
  ContentActionType[(ContentActionType["RESET"] = 6)] = "RESET";
})(ContentActionType || (ContentActionType = {}));
var initialState$1 = {
  tileId: null,
  paused: false,
  isLocalUserSharing: false,
  isLocalShareLoading: false,
  sharingAttendeeId: null,
};
function reducer$1(state, _a) {
  var type = _a.type,
    payload = _a.payload;
  switch (type) {
    case ContentActionType.STARTING: {
      return __assign$1D(__assign$1D({}, state), { isLocalShareLoading: true });
    }
    case ContentActionType.UPDATE: {
      var _b = payload,
        isLocalUser = _b.isLocalUser,
        tileState = _b.tileState;
      var tileId = state.tileId;
      if (
        tileId === tileState.tileId ||
        (tileId && tileId > tileState.tileId)
      ) {
        return state;
      }
      return {
        paused: false,
        tileId: tileState.tileId,
        isLocalShareLoading: false,
        isLocalUserSharing: isLocalUser,
        sharingAttendeeId: tileState.boundAttendeeId,
      };
    }
    case ContentActionType.REMOVE: {
      var tileId = state.tileId;
      if (tileId !== payload) {
        return state;
      }
      return initialState$1;
    }
    case ContentActionType.DID_STOP: {
      var isLocalUserSharing = state.isLocalUserSharing;
      if (isLocalUserSharing) {
        return initialState$1;
      }
      return __assign$1D(__assign$1D({}, state), {
        isLocalShareLoading: false,
        isLocalUserSharing: false,
        paused: false,
      });
    }
    case ContentActionType.TOGGLE_PAUSE: {
      if (!state.isLocalUserSharing) {
        return state;
      }
      return __assign$1D(__assign$1D({}, state), { paused: !state.paused });
    }
    case ContentActionType.DENIED: {
      if (!state.isLocalShareLoading) {
        return state;
      }
      return __assign$1D(__assign$1D({}, state), {
        isLocalShareLoading: false,
      });
    }
    case ContentActionType.RESET: {
      return initialState$1;
    }
    default:
      throw new Error("Incorrect type in VideoProvider");
  }
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$1 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$1 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var ContentShareContext = React.createContext(null);
var ContentShareControlContext = React.createContext(null);
var ContentShareProvider = function (_a) {
  var children = _a.children;
  var audioVideo = useAudioVideo();
  var _b = React.useReducer(reducer$1, initialState$1),
    state = _b[0],
    dispatch = _b[1];
  var paused = state.paused,
    isLocalUserSharing = state.isLocalUserSharing,
    isLocalShareLoading = state.isLocalShareLoading;
  var localUserTileIdRef = React.useRef(null);
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var videoObserver = {
        videoTileDidUpdate: function (tileState) {
          if (
            !tileState.boundAttendeeId ||
            !tileState.isContent ||
            !tileState.tileId
          ) {
            return;
          }
          var boundAttendeeId = tileState.boundAttendeeId;
          var baseAttendeeId = new amazonChimeSdkJs.DefaultModality(
            boundAttendeeId
          ).base();
          var localAttendeeId =
            audioVideo.audioVideoController.realtimeController.state
              .localAttendeeId;
          var isLocalUser = baseAttendeeId === localAttendeeId;
          if (
            !isLocalUser &&
            localUserTileIdRef.current &&
            localUserTileIdRef.current < tileState.tileId
          ) {
            audioVideo.stopContentShare();
            localUserTileIdRef.current = null;
          }
          if (isLocalUser) {
            localUserTileIdRef.current = tileState.tileId;
          }
          dispatch({
            type: ContentActionType.UPDATE,
            payload: {
              tileState: tileState,
              isLocalUser: isLocalUser,
            },
          });
        },
        videoTileWasRemoved: function (tileId) {
          if (tileId === localUserTileIdRef.current) {
            localUserTileIdRef.current = null;
          }
          dispatch({
            type: ContentActionType.REMOVE,
            payload: tileId,
          });
        },
      };
      var contentShareObserver = {
        contentShareDidStop: function () {
          dispatch({ type: ContentActionType.DID_STOP });
        },
      };
      audioVideo.addObserver(videoObserver);
      audioVideo.addContentShareObserver(contentShareObserver);
      return function () {
        audioVideo.removeObserver(videoObserver);
        audioVideo.removeContentShareObserver(contentShareObserver);
        dispatch({ type: ContentActionType.RESET });
      };
    },
    [audioVideo]
  );
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var cb = function (event) {
        if (event.reason.name === "NotAllowedError") {
          dispatch({ type: ContentActionType.DENIED });
        }
      };
      window.addEventListener("unhandledrejection", cb);
      return function () {
        return window.removeEventListener("unhandledrejection", cb);
      };
    },
    [isLocalShareLoading]
  );
  var toggleContentShare = React.useCallback(
    function () {
      return __awaiter$1(void 0, void 0, void 0, function () {
        return __generator$1(this, function (_a) {
          if (!audioVideo) {
            return [2 /*return*/];
          }
          if (isLocalUserSharing || isLocalShareLoading) {
            audioVideo.stopContentShare();
          } else {
            audioVideo.startContentShareFromScreenCapture();
            dispatch({ type: ContentActionType.STARTING });
          }
          return [2 /*return*/];
        });
      });
    },
    [audioVideo, isLocalUserSharing, isLocalShareLoading]
  );
  var togglePauseContentShare = React.useCallback(
    function () {
      if (!audioVideo || !isLocalUserSharing) {
        return;
      }
      if (paused) {
        audioVideo.unpauseContentShare();
      } else {
        audioVideo.pauseContentShare();
      }
      dispatch({ type: ContentActionType.TOGGLE_PAUSE });
    },
    [audioVideo, paused, isLocalUserSharing]
  );
  var controlsValue = React.useMemo(
    function () {
      return {
        paused: paused,
        isLocalUserSharing: isLocalUserSharing,
        isLocalShareLoading: isLocalShareLoading,
        toggleContentShare: toggleContentShare,
        togglePauseContentShare: togglePauseContentShare,
      };
    },
    [
      paused,
      toggleContentShare,
      togglePauseContentShare,
      isLocalUserSharing,
      isLocalShareLoading,
    ]
  );
  return React__default["default"].createElement(
    ContentShareContext.Provider,
    { value: state },
    React__default["default"].createElement(
      ContentShareControlContext.Provider,
      { value: controlsValue },
      children
    )
  );
};
var useContentShareState = function () {
  var contentShareState = React.useContext(ContentShareContext);
  if (!contentShareState) {
    throw new Error(
      "useContentShareState must be used within a ContentShareProvider"
    );
  }
  return contentShareState;
};
var useContentShareControls = function () {
  var context = React.useContext(ContentShareControlContext);
  if (!context) {
    throw new Error(
      "useContentShareControlContext must be used within ContentShareControlProvider"
    );
  }
  return context;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var VIDEO_INPUT = {
  NONE: "None",
  BLUE: "Blue",
  SMPTE: "SMPTE Color Bars",
};
var AUDIO_INPUT = {
  NONE: "None",
  440: "440 Hz",
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var getFormattedDropdownDeviceOptions = function (jsonObject) {
  var formattedJSONObject = Object.entries(jsonObject).map(function (entry) {
    return {
      deviceId: entry[0].toLowerCase(),
      label: entry[1],
    };
  });
  return formattedJSONObject;
};
var videoInputSelectionToDevice = function (deviceId) {
  if (deviceId === "blue") {
    return amazonChimeSdkJs.DefaultDeviceController.synthesizeVideoDevice(
      "blue"
    );
  }
  if (deviceId === "smpte") {
    return amazonChimeSdkJs.DefaultDeviceController.synthesizeVideoDevice(
      "smpte"
    );
  }
  if (deviceId === "none") {
    return null;
  }
  return deviceId;
};
var audioInputSelectionToDevice = function (deviceId) {
  if (deviceId === "440") {
    return amazonChimeSdkJs.DefaultDeviceController.synthesizeAudioDevice(440);
  }
  if (deviceId === "none") {
    return null;
  }
  return deviceId;
};
var isOptionActive = function (meetingManagerDeviceId, currentDeviceId) {
  if (currentDeviceId === "none" && meetingManagerDeviceId === null) {
    return true;
  }
  return currentDeviceId === meetingManagerDeviceId;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$2 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$2 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArrays$1 =
  (undefined && undefined.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
var Context = React.createContext(null);
var AudioInputProvider = function (_a) {
  var children = _a.children;
  var meetingManager = useMeetingManager();
  var audioVideo = useAudioVideo();
  var _b = React.useState([]),
    audioInputs = _b[0],
    setAudioInputs = _b[1];
  var _c = React.useState(meetingManager.selectedAudioInputDevice),
    selectedAudioInputDevice = _c[0],
    setSelectedAudioInputDevice = _c[1];
  var selectedInputRef = React.useRef(selectedAudioInputDevice);
  selectedInputRef.current = selectedAudioInputDevice;
  React.useEffect(function () {
    var callback = function (updatedAudioInputDevice) {
      setSelectedAudioInputDevice(updatedAudioInputDevice);
    };
    meetingManager.subscribeToSelectedAudioInputDevice(callback);
    return function () {
      meetingManager.unsubscribeFromSelectedAudioInputDevice(callback);
    };
  }, []);
  React.useEffect(
    function () {
      var isMounted = true;
      var observer = {
        audioInputsChanged: function (newAudioInputs) {
          return __awaiter$2(void 0, void 0, void 0, function () {
            var hasSelectedDevice;
            return __generator$2(this, function (_a) {
              switch (_a.label) {
                case 0:
                  Logger.log("AudioInputProvider - audio inputs updated");
                  hasSelectedDevice = newAudioInputs.some(function (device) {
                    return device.deviceId === selectedInputRef.current;
                  });
                  if (
                    !(
                      selectedInputRef.current &&
                      !hasSelectedDevice &&
                      newAudioInputs.length
                    )
                  )
                    return [3 /*break*/, 1];
                  Logger.log(
                    "Previously selected audio input lost. Selecting a default device."
                  );
                  meetingManager.selectAudioInputDevice(
                    newAudioInputs[0].deviceId
                  );
                  return [3 /*break*/, 3];
                case 1:
                  if (!(selectedInputRef.current === "default"))
                    return [3 /*break*/, 3];
                  Logger.log(
                    'Audio devices updated and "default" device is selected. Reselecting input.'
                  );
                  return [
                    4 /*yield*/,
                    audioVideo === null || audioVideo === void 0
                      ? void 0
                      : audioVideo.chooseAudioInputDevice(
                          selectedInputRef.current
                        ),
                  ];
                case 2:
                  _a.sent();
                  _a.label = 3;
                case 3:
                  setAudioInputs(newAudioInputs);
                  return [2 /*return*/];
              }
            });
          });
        },
      };
      function initAudioInput() {
        return __awaiter$2(this, void 0, void 0, function () {
          var devices;
          return __generator$2(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!audioVideo) {
                  return [2 /*return*/];
                }
                return [4 /*yield*/, audioVideo.listAudioInputDevices()];
              case 1:
                devices = _a.sent();
                if (isMounted) {
                  setAudioInputs(devices);
                  audioVideo.addDeviceChangeObserver(observer);
                }
                return [2 /*return*/];
            }
          });
        });
      }
      initAudioInput();
      return function () {
        isMounted = false;
        audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.removeDeviceChangeObserver(observer);
      };
    },
    [audioVideo]
  );
  var contextValue = React.useMemo(
    function () {
      return {
        devices: audioInputs,
        selectedDevice: selectedAudioInputDevice,
      };
    },
    [audioInputs, selectedAudioInputDevice]
  );
  return React__default["default"].createElement(
    Context.Provider,
    { value: contextValue },
    children
  );
};
var useAudioInputs = function (props) {
  var needAdditionalIO = props && props.additionalDevices;
  var context = React.useContext(Context);
  if (!context) {
    throw new Error("useAudioInputs must be used within AudioInputProvider");
  }
  var devices = context.devices;
  var selectedDevice = context.selectedDevice;
  if (needAdditionalIO) {
    var additionalAudioInputs = getFormattedDropdownDeviceOptions(AUDIO_INPUT);
    if (additionalAudioInputs !== null) {
      devices = __spreadArrays$1(devices, additionalAudioInputs);
    }
  }
  return { devices: devices, selectedDevice: selectedDevice };
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$3 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$3 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var AudioOutputContext = React.createContext(null);
var AudioOutputProvider = function (_a) {
  var children = _a.children;
  var audioVideo = useAudioVideo();
  var _b = React.useState([]),
    audioOutputs = _b[0],
    setAudioOutputs = _b[1];
  var meetingManager = useMeetingManager();
  var _c = React.useState(meetingManager.selectedAudioOutputDevice),
    selectedAudioOutputDevice = _c[0],
    setSelectedAudioOutputDevice = _c[1];
  React.useEffect(function () {
    var callback = function (updatedAudioOutputDevice) {
      setSelectedAudioOutputDevice(updatedAudioOutputDevice);
    };
    meetingManager.subscribeToSelectedAudioOutputDevice(callback);
    return function () {
      meetingManager.unsubscribeFromSelectedAudioOutputDevice(callback);
    };
  }, []);
  React.useEffect(
    function () {
      var isMounted = true;
      var observer = {
        audioOutputsChanged: function (newAudioOutputs) {
          Logger.log("AudioOutputProvider - audio outputs updated");
          setAudioOutputs(newAudioOutputs);
        },
      };
      function initAudioOutput() {
        return __awaiter$3(this, void 0, void 0, function () {
          var devices;
          return __generator$3(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!audioVideo) {
                  return [2 /*return*/];
                }
                return [4 /*yield*/, audioVideo.listAudioOutputDevices()];
              case 1:
                devices = _a.sent();
                if (isMounted) {
                  setAudioOutputs(devices);
                  audioVideo.addDeviceChangeObserver(observer);
                }
                return [2 /*return*/];
            }
          });
        });
      }
      initAudioOutput();
      return function () {
        isMounted = false;
        audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.removeDeviceChangeObserver(observer);
      };
    },
    [audioVideo]
  );
  var contextValue = React.useMemo(
    function () {
      return {
        devices: audioOutputs,
        selectedDevice: selectedAudioOutputDevice,
      };
    },
    [audioOutputs, selectedAudioOutputDevice]
  );
  return React__default["default"].createElement(
    AudioOutputContext.Provider,
    { value: contextValue },
    children
  );
};
var useAudioOutputs = function () {
  var context = React.useContext(AudioOutputContext);
  if (!context) {
    throw new Error("useAudioOutputs must be used within AudioOutputProvider");
  }
  return context;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$4 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$4 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArrays$2 =
  (undefined && undefined.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
var Context$1 = React.createContext(null);
var VideoInputProvider = function (_a) {
  var children = _a.children;
  var audioVideo = useAudioVideo();
  var _b = React.useState([]),
    videoInputs = _b[0],
    setVideoInputs = _b[1];
  var meetingManager = useMeetingManager();
  var _c = React.useState(meetingManager.selectedVideoInputDevice),
    selectedVideoInputDevice = _c[0],
    setSelectedVideoInputDevice = _c[1];
  React.useEffect(function () {
    var callback = function (updatedVideoInputDevice) {
      setSelectedVideoInputDevice(updatedVideoInputDevice);
    };
    meetingManager.subscribeToSelectedVideoInputDevice(callback);
    return function () {
      meetingManager.unsubscribeFromSelectedVideoInputDevice(callback);
    };
  }, []);
  React.useEffect(
    function () {
      var isMounted = true;
      var observer = {
        videoInputsChanged: function (newvideoInputs) {
          Logger.log("VideoInputProvider - video inputs updated");
          setVideoInputs(newvideoInputs);
        },
      };
      function initVideoInput() {
        return __awaiter$4(this, void 0, void 0, function () {
          var devices;
          return __generator$4(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!audioVideo) {
                  return [2 /*return*/];
                }
                return [4 /*yield*/, audioVideo.listVideoInputDevices()];
              case 1:
                devices = _a.sent();
                if (isMounted) {
                  setVideoInputs(devices);
                  audioVideo.addDeviceChangeObserver(observer);
                }
                return [2 /*return*/];
            }
          });
        });
      }
      initVideoInput();
      return function () {
        isMounted = false;
        audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.removeDeviceChangeObserver(observer);
      };
    },
    [audioVideo]
  );
  var contextValue = React.useMemo(
    function () {
      return {
        devices: videoInputs,
        selectedDevice: selectedVideoInputDevice,
      };
    },
    [videoInputs, selectedVideoInputDevice]
  );
  return React__default["default"].createElement(
    Context$1.Provider,
    { value: contextValue },
    children
  );
};
var useVideoInputs = function (props) {
  var needAdditionalIO = props && props.additionalDevices;
  var additionalIOJSON = props && VIDEO_INPUT;
  var context = React.useContext(Context$1);
  if (!context) {
    throw new Error("useVideoInputs must be used within VideoInputProvider");
  }
  var devices = context.devices;
  var selectedDevice = context.selectedDevice;
  if (needAdditionalIO) {
    var additionalVideoInputs = getFormattedDropdownDeviceOptions(
      additionalIOJSON
    );
    if (additionalVideoInputs !== null) {
      devices = __spreadArrays$2(devices, additionalVideoInputs);
    }
  }
  return { devices: devices, selectedDevice: selectedDevice };
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var DevicesProvider = function (_a) {
  var children = _a.children;
  return React__default["default"].createElement(
    AudioInputProvider,
    null,
    React__default["default"].createElement(
      AudioOutputProvider,
      null,
      React__default["default"].createElement(
        VideoInputProvider,
        null,
        children
      )
    )
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1E =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1E =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1E.apply(this, arguments);
  };
var __spreadArrays$3 =
  (undefined && undefined.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
var VideoTileActionType;
(function (VideoTileActionType) {
  VideoTileActionType[(VideoTileActionType["UPDATE"] = 0)] = "UPDATE";
  VideoTileActionType[(VideoTileActionType["REMOVE"] = 1)] = "REMOVE";
  VideoTileActionType[(VideoTileActionType["RESET"] = 2)] = "RESET";
})(VideoTileActionType || (VideoTileActionType = {}));
var initialState$2 = {
  tiles: [],
  tileIdToAttendeeId: {},
  attendeeIdToTileId: {},
  size: 0,
};
var removeProperty = function (obj, property) {
  var newState = Object.assign({}, obj);
  delete newState[property];
  return newState;
};
function reducer$2(state, _a) {
  var _b, _c;
  var type = _a.type,
    payload = _a.payload;
  var tiles = state.tiles,
    tileIdToAttendeeId = state.tileIdToAttendeeId,
    attendeeIdToTileId = state.attendeeIdToTileId,
    size = state.size;
  switch (type) {
    case VideoTileActionType.UPDATE: {
      var tileId = payload.tileId,
        _d = payload.attendeeId,
        attendeeId = _d === void 0 ? "" : _d;
      var tileStr = tileId.toString();
      var isPresent = tileIdToAttendeeId[tileStr];
      if (isPresent) {
        return state;
      }
      var newTiles = __spreadArrays$3(tiles, [tileId]);
      var tileIds = __assign$1E(
        __assign$1E({}, tileIdToAttendeeId),
        ((_b = {}), (_b[tileStr] = attendeeId), _b)
      );
      var attendeeIds = __assign$1E(
        __assign$1E({}, attendeeIdToTileId),
        ((_c = {}), (_c[attendeeId] = tileId), _c)
      );
      return {
        tiles: newTiles,
        tileIdToAttendeeId: tileIds,
        attendeeIdToTileId: attendeeIds,
        size: size + 1,
      };
    }
    case VideoTileActionType.REMOVE: {
      var tileId_1 = payload.tileId;
      var attendeeId = tileIdToAttendeeId[tileId_1];
      var tileStr = tileId_1.toString();
      if (!attendeeId) {
        return state;
      }
      var newTiles = tiles.filter(function (id) {
        return tileId_1 !== id;
      });
      var tileIds = removeProperty(tileIdToAttendeeId, tileStr);
      var attendeeIds = removeProperty(attendeeIdToTileId, attendeeId);
      return {
        tiles: newTiles,
        tileIdToAttendeeId: tileIds,
        attendeeIdToTileId: attendeeIds,
        size: size - 1,
      };
    }
    case VideoTileActionType.RESET: {
      return initialState$2;
    }
    default:
      throw new Error("Incorrect type in VideoProvider");
  }
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var Context$2 = React.createContext(null);
var RemoteVideoTileProvider = function (_a) {
  var children = _a.children;
  var audioVideo = useAudioVideo();
  var _b = React.useReducer(reducer$2, initialState$2),
    state = _b[0],
    dispatch = _b[1];
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var observer = {
        videoTileDidUpdate: function (tileState) {
          if (
            (tileState === null || tileState === void 0
              ? void 0
              : tileState.boundAttendeeId) &&
            (tileState === null || tileState === void 0
              ? void 0
              : tileState.tileId) &&
            !tileState.isContent &&
            !tileState.localTile
          ) {
            var tileId = tileState.tileId,
              boundAttendeeId = tileState.boundAttendeeId;
            dispatch({
              type: VideoTileActionType.UPDATE,
              payload: {
                tileId: tileId,
                attendeeId: boundAttendeeId,
              },
            });
          }
        },
        videoTileWasRemoved: function (tileId) {
          dispatch({
            type: VideoTileActionType.REMOVE,
            payload: {
              tileId: tileId,
            },
          });
        },
      };
      audioVideo.addObserver(observer);
      return function () {
        return audioVideo.removeObserver(observer);
      };
    },
    [audioVideo]
  );
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      return function () {
        return dispatch({ type: VideoTileActionType.RESET });
      };
    },
    [audioVideo]
  );
  return React__default["default"].createElement(
    Context$2.Provider,
    { value: state },
    children
  );
};
var useRemoteVideoTileState = function () {
  var state = React.useContext(Context$2);
  if (!state) {
    throw new Error(
      "useRemoteVideoTileState must be used within a RemoteVideoTileProvider"
    );
  }
  return state;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var TILE_TRANSITION_DELAY = 1500;
var FeaturedTileContext = React.createContext(null);
var FeaturedVideoTileProvider = function (_a) {
  var children = _a.children;
  var meetingManager = useMeetingManager();
  var attendeeIdToTileId = useRemoteVideoTileState().attendeeIdToTileId;
  var activeTileRef = React.useRef(null);
  var _b = React.useState(null),
    activeTile = _b[0],
    setActiveTile = _b[1];
  var timeout = React.useRef(null);
  var pendingAttendee = React.useRef(null);
  React.useEffect(
    function () {
      var activeSpeakerCallback = function (activeAttendees) {
        var activeId = activeAttendees[0];
        if (activeId === pendingAttendee.current) {
          return;
        }
        pendingAttendee.current = activeId;
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        if (!activeId) {
          activeTileRef.current = null;
          setActiveTile(null);
          return;
        }
        var tileId = attendeeIdToTileId[activeId];
        if (!tileId) {
          if (activeTileRef.current) {
            timeout.current = setTimeout(function () {
              activeTileRef.current = null;
              setActiveTile(null);
            }, TILE_TRANSITION_DELAY);
          }
          return;
        }
        if (tileId === activeTileRef.current) {
          return;
        }
        // Set featured tile immediately if there is no current featured tile.
        // Otherwise, delay it to avoid tiles jumping around too frequently
        if (!activeTileRef.current) {
          activeTileRef.current = tileId;
          setActiveTile(tileId);
        } else {
          timeout.current = setTimeout(function () {
            activeTileRef.current = tileId;
            setActiveTile(tileId);
          }, TILE_TRANSITION_DELAY);
        }
      };
      meetingManager.subscribeToActiveSpeaker(activeSpeakerCallback);
      return function () {
        return meetingManager.unsubscribeFromActiveSpeaker(
          activeSpeakerCallback
        );
      };
    },
    [attendeeIdToTileId]
  );
  var value = React.useMemo(
    function () {
      return {
        tileId: activeTile,
      };
    },
    [activeTile]
  );
  return React__default["default"].createElement(
    FeaturedTileContext.Provider,
    { value: value },
    children
  );
};
function useFeaturedTileState() {
  var state = React.useContext(FeaturedTileContext);
  if (!state) {
    throw new Error(
      "useFeaturedTileState must be used within an FeaturedVideoTileProvider"
    );
  }
  return state;
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var Context$3 = React.createContext(null);
var LocalAudioOutputProvider = function (_a) {
  var children = _a.children;
  var audioVideo = useAudioVideo();
  var _b = React.useState(true),
    isAudioOn = _b[0],
    setIsAudioOn = _b[1];
  var audioRef = React.useRef(null);
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      if (audioRef.current) {
        audioVideo.bindAudioElement(audioRef.current);
      }
      return function () {
        audioVideo.unbindAudioElement();
      };
    },
    [audioVideo]
  );
  var toggleAudio = React.useCallback(
    function () {
      if (!audioRef.current) {
        return;
      }
      setIsAudioOn(!isAudioOn);
      if (isAudioOn) {
        audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.unbindAudioElement();
      } else {
        audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.bindAudioElement(audioRef.current);
      }
    },
    [audioRef, audioVideo, isAudioOn]
  );
  var value = React.useMemo(
    function () {
      return { isAudioOn: isAudioOn, toggleAudio: toggleAudio };
    },
    [isAudioOn, toggleAudio]
  );
  return React__default["default"].createElement(
    Context$3.Provider,
    { value: value },
    children,
    React__default["default"].createElement("audio", {
      ref: audioRef,
      style: { display: "none" },
    })
  );
};
var useLocalAudioOutput = function () {
  var context = React.useContext(Context$3);
  if (!context) {
    throw new Error(
      "useLocalAudioOutput must be used within LocalAudioOutputProvider"
    );
  }
  return context;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$5 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$5 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var Context$4 = React.createContext(null);
var LocalVideoProvider = function (_a) {
  var children = _a.children;
  var meetingManager = useMeetingManager();
  var audioVideo = useAudioVideo();
  var _b = React.useState(false),
    isVideoEnabled = _b[0],
    setIsVideoEnabled = _b[1];
  var _c = React.useState(null),
    tileId = _c[0],
    setTileId = _c[1];
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      if (audioVideo.hasStartedLocalVideoTile()) {
        setIsVideoEnabled(true);
      }
      return function () {
        setIsVideoEnabled(false);
      };
    },
    [audioVideo]
  );
  var toggleVideo = React.useCallback(
    function () {
      return __awaiter$5(void 0, void 0, void 0, function () {
        return __generator$5(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(isVideoEnabled || !meetingManager.selectedVideoInputDevice))
                return [3 /*break*/, 1];
              audioVideo === null || audioVideo === void 0
                ? void 0
                : audioVideo.stopLocalVideoTile();
              setIsVideoEnabled(false);
              return [3 /*break*/, 3];
            case 1:
              return [
                4 /*yield*/,
                audioVideo === null || audioVideo === void 0
                  ? void 0
                  : audioVideo.chooseVideoInputDevice(
                      videoInputSelectionToDevice(
                        meetingManager.selectedVideoInputDevice
                      )
                    ),
              ];
            case 2:
              _a.sent();
              audioVideo === null || audioVideo === void 0
                ? void 0
                : audioVideo.startLocalVideoTile();
              setIsVideoEnabled(true);
              _a.label = 3;
            case 3:
              return [2 /*return*/];
          }
        });
      });
    },
    [audioVideo, isVideoEnabled, meetingManager.selectedVideoInputDevice]
  );
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var videoTileDidUpdate = function (tileState) {
        if (
          !tileState.localTile ||
          !tileState.tileId ||
          tileId === tileState.tileId
        ) {
          return;
        }
        setTileId(tileState.tileId);
      };
      audioVideo.addObserver({
        videoTileDidUpdate: videoTileDidUpdate,
      });
    },
    [audioVideo, tileId]
  );
  var value = React.useMemo(
    function () {
      return {
        isVideoEnabled: isVideoEnabled,
        toggleVideo: toggleVideo,
        tileId: tileId,
      };
    },
    [isVideoEnabled, toggleVideo, tileId]
  );
  return React__default["default"].createElement(
    Context$4.Provider,
    { value: value },
    children
  );
};
var useLocalVideo = function () {
  var context = React.useContext(Context$4);
  if (!context) {
    throw new Error("useLocalVideo must be used within LocalVideoProvider");
  }
  return context;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var DevicePermissionStatus;
(function (DevicePermissionStatus) {
  DevicePermissionStatus["UNSET"] = "UNSET";
  DevicePermissionStatus["IN_PROGRESS"] = "IN_PROGRESS";
  DevicePermissionStatus["GRANTED"] = "GRANTED";
  DevicePermissionStatus["DENIED"] = "DENIED";
})(DevicePermissionStatus || (DevicePermissionStatus = {}));

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
(function (MeetingStatus) {
  MeetingStatus[(MeetingStatus["Loading"] = 0)] = "Loading";
  MeetingStatus[(MeetingStatus["Succeeded"] = 1)] = "Succeeded";
  MeetingStatus[(MeetingStatus["Failed"] = 2)] = "Failed";
  MeetingStatus[(MeetingStatus["Ended"] = 3)] = "Ended";
})(exports.MeetingStatus || (exports.MeetingStatus = {}));

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$6 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$6 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var MeetingManager = /** @class */ (function () {
  function MeetingManager(config) {
    var _this = this;
    this.meetingSession = null;
    this.meetingStatus = exports.MeetingStatus.Loading;
    this.meetingStatusObservers = [];
    this.audioVideo = null;
    this.audioVideoObservers = {};
    this.configuration = null;
    this.meetingId = null;
    this.meetingRegion = null;
    this.selectedAudioOutputDevice = null;
    this.selectedAudioOutputDeviceObservers = [];
    this.selectedAudioInputDevice = null;
    this.selectedAudioInputDeviceObservers = [];
    this.selectedVideoInputDevice = null;
    this.selectedVideoInputDeviceObservers = [];
    this.audioInputDevices = null;
    this.audioOutputDevices = null;
    this.videoInputDevices = null;
    this.devicePermissionStatus = DevicePermissionStatus.UNSET;
    this.devicePermissionsObservers = [];
    this.activeSpeakerListener = null;
    this.activeSpeakerCallbacks = [];
    this.activeSpeakers = [];
    this.audioVideoCallbacks = [];
    this.devicesUpdatedCallbacks = [];
    this.logLevel = amazonChimeSdkJs.LogLevel.WARN;
    this.postLoggerConfig = null;
    this.simulcastEnabled = false;
    this.audioVideoDidStart = function () {
      Logger.log(
        "[MeetingManager audioVideoDidStart] Meeting started successfully"
      );
      _this.meetingStatus = exports.MeetingStatus.Succeeded;
      _this.publishMeetingStatus();
    };
    this.audioVideoDidStop = function (sessionStatus) {
      var sessionStatusCode = sessionStatus.statusCode();
      if (
        sessionStatusCode ===
        amazonChimeSdkJs.MeetingSessionStatusCode.AudioCallEnded
      ) {
        Logger.log("[MeetingManager audioVideoDidStop] Meeting ended for all");
        _this.meetingStatus = exports.MeetingStatus.Ended;
        _this.publishMeetingStatus();
      }
      _this.leave();
    };
    this.selectAudioInputDevice = function (deviceId) {
      return __awaiter$6(_this, void 0, void 0, function () {
        var receivedDevice, error_1;
        var _a, _b;
        return __generator$6(this, function (_c) {
          switch (_c.label) {
            case 0:
              _c.trys.push([0, 5, , 6]);
              receivedDevice = audioInputSelectionToDevice(deviceId);
              if (!(receivedDevice === null)) return [3 /*break*/, 2];
              return [
                4 /*yield*/,
                (_a = this.audioVideo) === null || _a === void 0
                  ? void 0
                  : _a.chooseAudioInputDevice(null),
              ];
            case 1:
              _c.sent();
              this.selectedAudioInputDevice = null;
              return [3 /*break*/, 4];
            case 2:
              return [
                4 /*yield*/,
                (_b = this.audioVideo) === null || _b === void 0
                  ? void 0
                  : _b.chooseAudioInputDevice(receivedDevice),
              ];
            case 3:
              _c.sent();
              this.selectedAudioInputDevice = deviceId;
              _c.label = 4;
            case 4:
              this.publishSelectedAudioInputDevice();
              return [3 /*break*/, 6];
            case 5:
              error_1 = _c.sent();
              console.error("Error setting audio input - " + error_1);
              return [3 /*break*/, 6];
            case 6:
              return [2 /*return*/];
          }
        });
      });
    };
    this.selectAudioOutputDevice = function (deviceId) {
      return __awaiter$6(_this, void 0, void 0, function () {
        var error_2;
        var _a;
        return __generator$6(this, function (_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 2, , 3]);
              return [
                4 /*yield*/,
                (_a = this.audioVideo) === null || _a === void 0
                  ? void 0
                  : _a.chooseAudioOutputDevice(deviceId),
              ];
            case 1:
              _b.sent();
              this.selectedAudioOutputDevice = deviceId;
              this.publishSelectedAudioOutputDevice();
              return [3 /*break*/, 3];
            case 2:
              error_2 = _b.sent();
              console.error("Error setting audio output - " + error_2);
              return [3 /*break*/, 3];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    };
    this.selectVideoInputDevice = function (deviceId) {
      return __awaiter$6(_this, void 0, void 0, function () {
        var receivedDevice, error_3;
        var _a, _b;
        return __generator$6(this, function (_c) {
          switch (_c.label) {
            case 0:
              _c.trys.push([0, 5, , 6]);
              receivedDevice = videoInputSelectionToDevice(deviceId);
              if (!(receivedDevice === null)) return [3 /*break*/, 2];
              return [
                4 /*yield*/,
                (_a = this.audioVideo) === null || _a === void 0
                  ? void 0
                  : _a.chooseVideoInputDevice(null),
              ];
            case 1:
              _c.sent();
              this.selectedVideoInputDevice = null;
              return [3 /*break*/, 4];
            case 2:
              return [
                4 /*yield*/,
                (_b = this.audioVideo) === null || _b === void 0
                  ? void 0
                  : _b.chooseVideoInputDevice(receivedDevice),
              ];
            case 3:
              _c.sent();
              this.selectedVideoInputDevice = deviceId;
              _c.label = 4;
            case 4:
              this.publishSelectedVideoInputDevice();
              return [3 /*break*/, 6];
            case 5:
              error_3 = _c.sent();
              console.error("Error setting video input - " + error_3);
              return [3 /*break*/, 6];
            case 6:
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * ====================================================================
     * Subscriptions
     * ====================================================================
     */
    this.subscribeToAudioVideo = function (callback) {
      _this.audioVideoCallbacks.push(callback);
    };
    this.unsubscribeFromAudioVideo = function (callbackToRemove) {
      _this.audioVideoCallbacks = _this.audioVideoCallbacks.filter(function (
        callback
      ) {
        return callback !== callbackToRemove;
      });
    };
    this.publishAudioVideo = function () {
      _this.audioVideoCallbacks.forEach(function (callback) {
        callback(_this.audioVideo);
      });
    };
    this.subscribeToActiveSpeaker = function (callback) {
      _this.activeSpeakerCallbacks.push(callback);
      callback(_this.activeSpeakers);
    };
    this.unsubscribeFromActiveSpeaker = function (callbackToRemove) {
      _this.activeSpeakerCallbacks = _this.activeSpeakerCallbacks.filter(
        function (callback) {
          return callback !== callbackToRemove;
        }
      );
    };
    this.publishActiveSpeaker = function () {
      _this.activeSpeakerCallbacks.forEach(function (callback) {
        callback(_this.activeSpeakers);
      });
    };
    this.subscribeToDevicePermissionStatus = function (callback) {
      _this.devicePermissionsObservers.push(callback);
    };
    this.unsubscribeFromDevicePermissionStatus = function (callbackToRemove) {
      _this.devicePermissionsObservers = _this.devicePermissionsObservers.filter(
        function (callback) {
          return callback !== callbackToRemove;
        }
      );
    };
    this.publishDevicePermissionStatus = function () {
      for (var i = 0; i < _this.devicePermissionsObservers.length; i += 1) {
        var callback = _this.devicePermissionsObservers[i];
        callback(_this.devicePermissionStatus);
      }
    };
    this.subscribeToSelectedVideoInputDevice = function (callback) {
      _this.selectedVideoInputDeviceObservers.push(callback);
    };
    this.unsubscribeFromSelectedVideoInputDevice = function (callbackToRemove) {
      _this.selectedVideoInputDeviceObservers = _this.selectedVideoInputDeviceObservers.filter(
        function (callback) {
          return callback !== callbackToRemove;
        }
      );
    };
    this.publishSelectedVideoInputDevice = function () {
      for (
        var i = 0;
        i < _this.selectedVideoInputDeviceObservers.length;
        i += 1
      ) {
        var callback = _this.selectedVideoInputDeviceObservers[i];
        callback(_this.selectedVideoInputDevice);
      }
    };
    this.subscribeToSelectedAudioInputDevice = function (callback) {
      _this.selectedAudioInputDeviceObservers.push(callback);
    };
    this.unsubscribeFromSelectedAudioInputDevice = function (callbackToRemove) {
      _this.selectedAudioInputDeviceObservers = _this.selectedAudioInputDeviceObservers.filter(
        function (callback) {
          return callback !== callbackToRemove;
        }
      );
    };
    this.publishSelectedAudioInputDevice = function () {
      for (
        var i = 0;
        i < _this.selectedAudioInputDeviceObservers.length;
        i += 1
      ) {
        var callback = _this.selectedAudioInputDeviceObservers[i];
        callback(_this.selectedAudioInputDevice);
      }
    };
    this.subscribeToSelectedAudioOutputDevice = function (callback) {
      _this.selectedAudioOutputDeviceObservers.push(callback);
    };
    this.unsubscribeFromSelectedAudioOutputDevice = function (
      callbackToRemove
    ) {
      _this.selectedAudioOutputDeviceObservers = _this.selectedAudioOutputDeviceObservers.filter(
        function (callback) {
          return callback !== callbackToRemove;
        }
      );
    };
    this.publishSelectedAudioOutputDevice = function () {
      for (
        var i = 0;
        i < _this.selectedAudioOutputDeviceObservers.length;
        i += 1
      ) {
        var callback = _this.selectedAudioOutputDeviceObservers[i];
        callback(_this.selectedAudioOutputDevice);
      }
    };
    this.subscribeToMeetingStatus = function (callback) {
      _this.meetingStatusObservers.push(callback);
      callback(_this.meetingStatus);
    };
    this.unsubscribeFromMeetingStatus = function (callbackToRemove) {
      _this.meetingStatusObservers = _this.meetingStatusObservers.filter(
        function (callback) {
          return callback !== callbackToRemove;
        }
      );
    };
    this.publishMeetingStatus = function () {
      _this.meetingStatusObservers.forEach(function (callback) {
        callback(_this.meetingStatus);
      });
    };
    this.logLevel = config.logLevel;
    if (config.simulcastEnabled) {
      this.simulcastEnabled = config.simulcastEnabled;
    }
    if (config.postLogConfig) {
      this.postLoggerConfig = config.postLogConfig;
    }
  }
  MeetingManager.prototype.initializeMeetingManager = function () {
    this.meetingSession = null;
    this.audioVideo = null;
    this.configuration = null;
    this.meetingId = null;
    this.meetingRegion = null;
    this.selectedAudioOutputDevice = null;
    this.selectedAudioInputDevice = null;
    this.selectedVideoInputDevice = null;
    this.audioInputDevices = [];
    this.audioOutputDevices = [];
    this.videoInputDevices = [];
    this.activeSpeakers = [];
    this.activeSpeakerListener = null;
    this.meetingStatus = exports.MeetingStatus.Loading;
    this.publishMeetingStatus();
    this.meetingStatusObservers = [];
    this.audioVideoObservers = {};
  };
  MeetingManager.prototype.join = function (_a) {
    var meetingInfo = _a.meetingInfo,
      attendeeInfo = _a.attendeeInfo;
    return __awaiter$6(this, void 0, void 0, function () {
      return __generator$6(this, function (_b) {
        switch (_b.label) {
          case 0:
            this.configuration = new amazonChimeSdkJs.MeetingSessionConfiguration(
              meetingInfo,
              attendeeInfo
            );
            if (this.simulcastEnabled) {
              this.configuration.enableUnifiedPlanForChromiumBasedBrowsers = true;
              this.configuration.enableSimulcastForUnifiedPlanChromiumBasedBrowsers = true;
            }
            this.meetingRegion = meetingInfo.MediaRegion;
            this.meetingId = this.configuration.meetingId;
            return [
              4 /*yield*/,
              this.initializeMeetingSession(this.configuration),
            ];
          case 1:
            _b.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  MeetingManager.prototype.start = function () {
    var _a;
    return __awaiter$6(this, void 0, void 0, function () {
      return __generator$6(this, function (_b) {
        (_a = this.audioVideo) === null || _a === void 0 ? void 0 : _a.start();
        return [2 /*return*/];
      });
    });
  };
  MeetingManager.prototype.leave = function () {
    return __awaiter$6(this, void 0, void 0, function () {
      var e_1;
      return __generator$6(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.audioVideo) return [3 /*break*/, 7];
            this.audioVideo.stopContentShare();
            this.audioVideo.stopLocalVideoTile();
            this.audioVideo.unbindAudioElement();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 5, , 6]);
            return [4 /*yield*/, this.audioVideo.chooseVideoInputDevice(null)];
          case 2:
            _a.sent();
            return [4 /*yield*/, this.audioVideo.chooseAudioInputDevice(null)];
          case 3:
            _a.sent();
            return [4 /*yield*/, this.audioVideo.chooseAudioOutputDevice(null)];
          case 4:
            _a.sent();
            return [3 /*break*/, 6];
          case 5:
            e_1 = _a.sent();
            Logger.log("Unable to set device to null on leave.");
            return [3 /*break*/, 6];
          case 6:
            if (this.activeSpeakerListener) {
              this.audioVideo.unsubscribeFromActiveSpeakerDetector(
                this.activeSpeakerListener
              );
            }
            if (!this.audioVideo) return;
            this.audioVideo.stop();
            this.audioVideo.removeObserver(this.audioVideoObservers);
            _a.label = 7;
          case 7:
            this.initializeMeetingManager();
            this.publishAudioVideo();
            this.publishActiveSpeaker();
            return [2 /*return*/];
        }
      });
    });
  };
  MeetingManager.prototype.initializeMeetingSession = function (configuration) {
    return __awaiter$6(this, void 0, void 0, function () {
      var logger, deviceController;
      return __generator$6(this, function (_a) {
        switch (_a.label) {
          case 0:
            logger = this.createLogger(configuration);
            deviceController = new amazonChimeSdkJs.DefaultDeviceController(
              logger
            );
            this.meetingSession = new amazonChimeSdkJs.DefaultMeetingSession(
              configuration,
              logger,
              deviceController
            );
            this.audioVideo = this.meetingSession.audioVideo;
            this.setupAudioVideoObservers();
            this.setupDeviceLabelTrigger();
            return [4 /*yield*/, this.listAndSelectDevices()];
          case 1:
            _a.sent();
            this.publishAudioVideo();
            this.setupActiveSpeakerDetection();
            this.meetingStatus = exports.MeetingStatus.Loading;
            this.publishMeetingStatus();
            return [2 /*return*/];
        }
      });
    });
  };
  MeetingManager.prototype.createLogger = function (configuration) {
    var consoleLogger = new amazonChimeSdkJs.ConsoleLogger(
      "SDK",
      this.logLevel
    );
    var logger = consoleLogger;
    if (this.postLoggerConfig) {
      logger = new amazonChimeSdkJs.MultiLogger(
        consoleLogger,
        new amazonChimeSdkJs.MeetingSessionPOSTLogger(
          this.postLoggerConfig.name,
          configuration,
          this.postLoggerConfig.batchSize,
          this.postLoggerConfig.intervalMs,
          this.postLoggerConfig.url,
          this.postLoggerConfig.logLevel
        )
      );
    }
    return logger;
  };
  MeetingManager.prototype.setupAudioVideoObservers = function () {
    if (!this.audioVideo) {
      return;
    }
    this.audioVideoObservers = {
      audioVideoDidStart: this.audioVideoDidStart,
      audioVideoDidStop: this.audioVideoDidStop,
    };
    this.audioVideo.addObserver(this.audioVideoObservers);
  };
  MeetingManager.prototype.updateDeviceLists = function () {
    var _a, _b, _c;
    return __awaiter$6(this, void 0, void 0, function () {
      var _d, _e, _f;
      return __generator$6(this, function (_g) {
        switch (_g.label) {
          case 0:
            _d = this;
            return [
              4 /*yield*/,
              (_a = this.audioVideo) === null || _a === void 0
                ? void 0
                : _a.listAudioInputDevices(),
            ];
          case 1:
            _d.audioInputDevices = _g.sent() || [];
            _e = this;
            return [
              4 /*yield*/,
              (_b = this.audioVideo) === null || _b === void 0
                ? void 0
                : _b.listVideoInputDevices(),
            ];
          case 2:
            _e.videoInputDevices = _g.sent() || [];
            _f = this;
            return [
              4 /*yield*/,
              (_c = this.audioVideo) === null || _c === void 0
                ? void 0
                : _c.listAudioOutputDevices(),
            ];
          case 3:
            _f.audioOutputDevices = _g.sent() || [];
            return [2 /*return*/];
        }
      });
    });
  };
  MeetingManager.prototype.setupDeviceLabelTrigger = function () {
    var _this = this;
    var _a;
    var callback = function () {
      return __awaiter$6(_this, void 0, void 0, function () {
        var stream, e_2;
        return __generator$6(this, function (_a) {
          switch (_a.label) {
            case 0:
              this.devicePermissionStatus = DevicePermissionStatus.IN_PROGRESS;
              this.publishDevicePermissionStatus();
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                navigator.mediaDevices.getUserMedia({
                  audio: true,
                  video: true,
                }),
              ];
            case 2:
              stream = _a.sent();
              this.devicePermissionStatus = DevicePermissionStatus.GRANTED;
              this.publishDevicePermissionStatus();
              return [2 /*return*/, stream];
            case 3:
              e_2 = _a.sent();
              console.error("Failed to get device permissions");
              this.devicePermissionStatus = DevicePermissionStatus.DENIED;
              this.publishDevicePermissionStatus();
              throw new Error(e_2);
            case 4:
              return [2 /*return*/];
          }
        });
      });
    };
    (_a = this.audioVideo) === null || _a === void 0
      ? void 0
      : _a.setDeviceLabelTrigger(callback);
  };
  MeetingManager.prototype.setupActiveSpeakerDetection = function () {
    var _this = this;
    var _a;
    this.publishActiveSpeaker();
    this.activeSpeakerListener = function (activeSpeakers) {
      _this.activeSpeakers = activeSpeakers;
      _this.activeSpeakerCallbacks.forEach(function (cb) {
        return cb(activeSpeakers);
      });
    };
    (_a = this.audioVideo) === null || _a === void 0
      ? void 0
      : _a.subscribeToActiveSpeakerDetector(
          new amazonChimeSdkJs.DefaultActiveSpeakerPolicy(),
          this.activeSpeakerListener
        );
  };
  MeetingManager.prototype.listAndSelectDevices = function () {
    var _a, _b;
    return __awaiter$6(this, void 0, void 0, function () {
      return __generator$6(this, function (_c) {
        switch (_c.label) {
          case 0:
            return [4 /*yield*/, this.updateDeviceLists()];
          case 1:
            _c.sent();
            if (
              !(
                !this.selectedAudioInputDevice &&
                this.audioInputDevices &&
                this.audioInputDevices.length
              )
            )
              return [3 /*break*/, 3];
            this.selectedAudioInputDevice = this.audioInputDevices[0].deviceId;
            return [
              4 /*yield*/,
              (_a = this.audioVideo) === null || _a === void 0
                ? void 0
                : _a.chooseAudioInputDevice(this.audioInputDevices[0].deviceId),
            ];
          case 2:
            _c.sent();
            this.publishSelectedAudioInputDevice();
            _c.label = 3;
          case 3:
            if (
              !(
                !this.selectedAudioOutputDevice &&
                this.audioOutputDevices &&
                this.audioOutputDevices.length
              )
            )
              return [3 /*break*/, 5];
            this.selectedAudioOutputDevice = this.audioOutputDevices[0].deviceId;
            return [
              4 /*yield*/,
              (_b = this.audioVideo) === null || _b === void 0
                ? void 0
                : _b.chooseAudioOutputDevice(
                    this.audioOutputDevices[0].deviceId
                  ),
            ];
          case 4:
            _c.sent();
            this.publishSelectedAudioOutputDevice();
            _c.label = 5;
          case 5:
            if (
              !this.selectedVideoInputDevice &&
              this.videoInputDevices &&
              this.videoInputDevices.length
            ) {
              this.selectedVideoInputDevice = this.videoInputDevices[0].deviceId;
              this.publishSelectedVideoInputDevice();
            }
            return [2 /*return*/];
        }
      });
    });
  };
  return MeetingManager;
})();

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1F =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1F =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1F.apply(this, arguments);
  };
var __awaiter$7 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$7 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __rest$K =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var RosterContext = React__default["default"].createContext(null);
var RosterProvider = function (_a) {
  var children = _a.children;
  var meetingManager = useMeetingManager();
  var audioVideo = useAudioVideo();
  var rosterRef = React.useRef({});
  var _b = React.useState({}),
    roster = _b[0],
    setRoster = _b[1];
  meetingManager.getAttendee;
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var rosterUpdateCallback = function (
        chimeAttendeeId,
        present,
        externalUserId
      ) {
        return __awaiter$7(void 0, void 0, void 0, function () {
          var attendeeId, inRoster, attendee, externalData;
          return __generator$7(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!present) {
                  delete rosterRef.current[chimeAttendeeId];
                  setRoster(function (currentRoster) {
                    var _a = currentRoster,
                      _b = chimeAttendeeId,
                      _ = _a[_b],
                      rest = __rest$K(_a, [
                        typeof _b === "symbol" ? _b : _b + "",
                      ]);
                    return __assign$1F({}, rest);
                  });
                  return [2 /*return*/];
                }
                attendeeId = new amazonChimeSdkJs.DefaultModality(
                  chimeAttendeeId
                ).base();
                if (attendeeId !== chimeAttendeeId) {
                  return [2 /*return*/];
                }
                inRoster = rosterRef.current[chimeAttendeeId];
                if (inRoster) {
                  return [2 /*return*/];
                }
                attendee = { chimeAttendeeId: chimeAttendeeId };
                if (externalUserId) {
                  attendee.externalUserId = externalUserId;
                }
                if (!meetingManager.getAttendee) return [3 /*break*/, 2];
                return [
                  4 /*yield*/,
                  meetingManager.getAttendee(attendeeId, externalUserId),
                ];
              case 1:
                externalData = _a.sent();
                attendee = __assign$1F(__assign$1F({}, attendee), externalData);
                _a.label = 2;
              case 2:
                rosterRef.current[attendeeId] = attendee;
                setRoster(function (oldRoster) {
                  var _a;
                  return __assign$1F(
                    __assign$1F({}, oldRoster),
                    ((_a = {}), (_a[attendeeId] = attendee), _a)
                  );
                });
                return [2 /*return*/];
            }
          });
        });
      };
      audioVideo.realtimeSubscribeToAttendeeIdPresence(rosterUpdateCallback);
      return function () {
        setRoster({});
        rosterRef.current = {};
        audioVideo.realtimeUnsubscribeToAttendeeIdPresence(
          rosterUpdateCallback
        );
      };
    },
    [audioVideo]
  );
  var value = React.useMemo(
    function () {
      return {
        roster: roster,
      };
    },
    [roster]
  );
  return React__default["default"].createElement(
    RosterContext.Provider,
    { value: value },
    children
  );
};
function useRosterState() {
  var state = React.useContext(RosterContext);
  if (!state) {
    throw new Error("userRosterState must be used within RosterProvider");
  }
  return state;
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var MeetingContext = React.createContext(null);
var MeetingProvider = function (_a) {
  var _b = _a.logLevel,
    logLevel = _b === void 0 ? amazonChimeSdkJs.LogLevel.WARN : _b,
    postLogConfig = _a.postLogConfig,
    _c = _a.simulcastEnabled,
    simulcastEnabled = _c === void 0 ? false : _c,
    children = _a.children;
  var meetingManager = React.useState(function () {
    return new MeetingManager({
      logLevel: logLevel,
      postLogConfig: postLogConfig,
      simulcastEnabled: simulcastEnabled,
    });
  })[0];
  return React__default["default"].createElement(
    MeetingContext.Provider,
    { value: meetingManager },
    React__default["default"].createElement(
      AudioVideoProvider,
      null,
      React__default["default"].createElement(
        DevicesProvider,
        null,
        React__default["default"].createElement(
          RosterProvider,
          null,
          React__default["default"].createElement(
            RemoteVideoTileProvider,
            null,
            React__default["default"].createElement(
              LocalVideoProvider,
              null,
              React__default["default"].createElement(
                LocalAudioOutputProvider,
                null,
                React__default["default"].createElement(
                  ContentShareProvider,
                  null,
                  React__default["default"].createElement(
                    FeaturedVideoTileProvider,
                    null,
                    children
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};
var useMeetingManager = function () {
  var meetingManager = React.useContext(MeetingContext);
  if (!meetingManager) {
    throw new Error("useMeetingManager must be used within MeetingProvider");
  }
  return meetingManager;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$8 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$8 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var CameraSelection = function (_a) {
  var _b = _a.notFoundMsg,
    notFoundMsg = _b === void 0 ? "No camera devices found" : _b,
    _c = _a.label,
    label = _c === void 0 ? "Camera" : _c;
  var meetingManager = useMeetingManager();
  var _d = useVideoInputs(),
    devices = _d.devices,
    selectedDevice = _d.selectedDevice;
  function selectVideoInput(deviceId) {
    return __awaiter$8(this, void 0, void 0, function () {
      return __generator$8(this, function (_a) {
        meetingManager.selectVideoInputDevice(deviceId);
        return [2 /*return*/];
      });
    });
  }
  return React__default["default"].createElement(DeviceInput, {
    label: label,
    onChange: selectVideoInput,
    devices: devices,
    selectedDeviceId: selectedDevice,
    notFoundMsg: notFoundMsg,
  });
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$9 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$9 =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var useSelectAudioInputDevice = function () {
  var meetingManager = useMeetingManager();
  var selectDevice = React.useCallback(function (deviceId) {
    return __awaiter$9(void 0, void 0, void 0, function () {
      return __generator$9(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              meetingManager.selectAudioInputDevice(deviceId),
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  }, []);
  return selectDevice;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var MicSelection = function (_a) {
  var _b = _a.notFoundMsg,
    notFoundMsg = _b === void 0 ? "No microphone devices found" : _b,
    _c = _a.label,
    label = _c === void 0 ? "Microphone" : _c;
  var selectAudioInput = useSelectAudioInputDevice();
  var _d = useAudioInputs(),
    devices = _d.devices,
    selectedDevice = _d.selectedDevice;
  return React__default["default"].createElement(DeviceInput, {
    label: label,
    onChange: selectAudioInput,
    devices: devices,
    selectedDeviceId: selectedDevice,
    notFoundMsg: notFoundMsg,
  });
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useSelectVideoQuality() {
  var audioVideo = useAudioVideo();
  var selectVideoQuality = React.useCallback(
    function (quality) {
      if (!audioVideo) {
        return;
      }
      Logger.log("Selecting video quality: " + quality);
      switch (quality) {
        case "360p":
          audioVideo.chooseVideoInputQuality(640, 360, 15, 600);
          break;
        case "540p":
          audioVideo.chooseVideoInputQuality(960, 540, 15, 1400);
          break;
        case "720p":
          audioVideo.chooseVideoInputQuality(1280, 720, 15, 1400);
          break;
        default:
          Logger.log("Unsupported video quality: " + quality);
      }
    },
    [audioVideo]
  );
  return selectVideoQuality;
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$a =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$a =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var qualityOptions = [
  {
    label: "Select video quality",
    value: "unselected",
  },
  {
    label: VIDEO_INPUT_QUALITY["720p"],
    value: "720p",
  },
  {
    label: VIDEO_INPUT_QUALITY["540p"],
    value: "540p",
  },
  {
    label: VIDEO_INPUT_QUALITY["360p"],
    value: "360p",
  },
];
var QualitySelection = function (_a) {
  var _b = _a.label,
    label = _b === void 0 ? "Video Quality" : _b;
  var selectVideoQuality = useSelectVideoQuality();
  var _c = React.useState("unselected"),
    videoQuality = _c[0],
    setVideoQuality = _c[1];
  function selectQuality(e) {
    return __awaiter$a(this, void 0, void 0, function () {
      var quality;
      return __generator$a(this, function (_a) {
        quality = e.target.value;
        setVideoQuality(quality);
        selectVideoQuality(quality);
        return [2 /*return*/];
      });
    });
  }
  return React__default["default"].createElement(FormField, {
    field: Select,
    options: qualityOptions,
    onChange: selectQuality,
    value: videoQuality,
    label: label,
  });
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$b =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$b =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var useSelectAudioOutputDevice = function () {
  var meetingManager = useMeetingManager();
  var selectDevice = React.useCallback(function (deviceId) {
    return __awaiter$b(void 0, void 0, void 0, function () {
      return __generator$b(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              meetingManager.selectAudioOutputDevice(deviceId),
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  }, []);
  return selectDevice;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$c =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$c =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var SpeakerSelection = function (_a) {
  var _b = _a.notFoundMsg,
    notFoundMsg = _b === void 0 ? "No speaker devices found" : _b,
    _c = _a.label,
    label = _c === void 0 ? "Speakers" : _c,
    onChange = _a.onChange;
  var _d = useAudioOutputs(),
    devices = _d.devices,
    selectedDevice = _d.selectedDevice;
  var selectAudioOutput = useSelectAudioOutputDevice();
  function selectDevice(deviceId) {
    return __awaiter$c(this, void 0, void 0, function () {
      return __generator$c(this, function (_a) {
        selectAudioOutput(deviceId);
        onChange && onChange(deviceId);
        return [2 /*return*/];
      });
    });
  }
  return React__default["default"].createElement(DeviceInput, {
    label: label,
    devices: devices,
    onChange: selectDevice,
    selectedDeviceId: selectedDevice,
    notFoundMsg: notFoundMsg,
  });
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useToggleLocalMute() {
  var audioVideo = useAudioVideo();
  var _a = React.useState(function () {
      return (
        (audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.realtimeIsLocalAudioMuted()) || false
      );
    }),
    muted = _a[0],
    setMuted = _a[1];
  React.useEffect(
    function () {
      var muteUnmutecallback = function (localMuted) {
        setMuted(localMuted);
      };
      audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.realtimeSubscribeToMuteAndUnmuteLocalAudio(
            muteUnmutecallback
          );
      setMuted(
        (audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.realtimeIsLocalAudioMuted()) || false
      );
      return function () {
        audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.realtimeUnsubscribeToMuteAndUnmuteLocalAudio(
              muteUnmutecallback
            );
      };
    },
    [audioVideo]
  );
  var toggleMute = React.useCallback(
    function () {
      if (muted) {
        audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.realtimeUnmuteLocalAudio();
      } else {
        audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.realtimeMuteLocalAudio();
      }
    },
    [muted, audioVideo]
  );
  return { muted: muted, toggleMute: toggleMute };
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var AudioInputControl = function (_a) {
  var _b = _a.muteLabel,
    muteLabel = _b === void 0 ? "Mute" : _b,
    _c = _a.unmuteLabel,
    unmuteLabel = _c === void 0 ? "Unmute" : _c;
  var meetingManager = useMeetingManager();
  var _d = useToggleLocalMute(),
    muted = _d.muted,
    toggleMute = _d.toggleMute;
  var audioInputConfig = {
    additionalDevices: true,
  };
  var _e = useAudioInputs(audioInputConfig),
    devices = _e.devices,
    selectedDevice = _e.selectedDevice;
  var dropdownOptions = devices.map(function (device) {
    return {
      children: React__default["default"].createElement(
        "span",
        null,
        device.label
      ),
      checked: isOptionActive(selectedDevice, device.deviceId),
      onClick: function () {
        return meetingManager.selectAudioInputDevice(device.deviceId);
      },
    };
  });
  return React__default["default"].createElement(ControlBarButton, {
    icon: React__default["default"].createElement(Microphone, { muted: muted }),
    onClick: toggleMute,
    label: muted ? unmuteLabel : muteLabel,
    popOver: dropdownOptions,
  });
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var AudioOutputControl = function (_a) {
  var _b = _a.label,
    label = _b === void 0 ? "Speaker" : _b;
  var meetingManager = useMeetingManager();
  var _c = useAudioOutputs(),
    devices = _c.devices,
    selectedDevice = _c.selectedDevice;
  var _d = useLocalAudioOutput(),
    isAudioOn = _d.isAudioOn,
    toggleAudio = _d.toggleAudio;
  var dropdownOptions = devices.map(function (device) {
    return {
      children: React__default["default"].createElement(
        "span",
        null,
        device.label
      ),
      checked: isOptionActive(selectedDevice, device.deviceId),
      onClick: function () {
        return meetingManager.selectAudioOutputDevice(device.deviceId);
      },
    };
  });
  return React__default["default"].createElement(
    React__default["default"].Fragment,
    null,
    React__default["default"].createElement(ControlBarButton, {
      icon: React__default["default"].createElement(Sound, {
        disabled: !isAudioOn,
      }),
      onClick: toggleAudio,
      label: label,
      popOver: dropdownOptions.length ? dropdownOptions : null,
    })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var ContentShareControl = function (_a) {
  var _b = _a.label,
    label = _b === void 0 ? "Content" : _b,
    _c = _a.pauseLabel,
    pauseLabel = _c === void 0 ? "Pause" : _c,
    _d = _a.unpauseLabel,
    unpauseLabel = _d === void 0 ? "Unpause" : _d;
  var isLocalUserSharing = useContentShareState().isLocalUserSharing;
  var _e = useContentShareControls(),
    paused = _e.paused,
    toggleContentShare = _e.toggleContentShare,
    togglePauseContentShare = _e.togglePauseContentShare;
  var dropdownOptions = [
    {
      children: React__default["default"].createElement(
        "span",
        null,
        paused ? unpauseLabel : pauseLabel
      ),
      onClick: togglePauseContentShare,
    },
  ];
  return React__default["default"].createElement(
    React__default["default"].Fragment,
    null,
    React__default["default"].createElement(ControlBarButton, {
      icon: React__default["default"].createElement(ScreenShare, null),
      onClick: toggleContentShare,
      label: label,
      popOver: isLocalUserSharing ? dropdownOptions : null,
    })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter$d =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$d =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var useSelectVideoInputDevice = function () {
  var _a = useLocalVideo(),
    isVideoEnabled = _a.isVideoEnabled,
    toggleVideo = _a.toggleVideo;
  var meetingManager = useMeetingManager();
  var selectVideo = React.useCallback(
    function (deviceId) {
      return __awaiter$d(void 0, void 0, void 0, function () {
        return __generator$d(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(deviceId === "none" && isVideoEnabled))
                return [3 /*break*/, 2];
              return [4 /*yield*/, toggleVideo()];
            case 1:
              _a.sent();
              _a.label = 2;
            case 2:
              return [
                4 /*yield*/,
                meetingManager.selectVideoInputDevice(deviceId),
              ];
            case 3:
              _a.sent();
              return [2 /*return*/];
          }
        });
      });
    },
    [isVideoEnabled]
  );
  return selectVideo;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var videoInputConfig = {
  additionalDevices: true,
};
var VideoInputControl = function (_a) {
  var _b = _a.label,
    label = _b === void 0 ? "Video" : _b;
  var _c = useVideoInputs(videoInputConfig),
    devices = _c.devices,
    selectedDevice = _c.selectedDevice;
  var _d = useLocalVideo(),
    isVideoEnabled = _d.isVideoEnabled,
    toggleVideo = _d.toggleVideo;
  var selectDevice = useSelectVideoInputDevice();
  var dropdownOptions = devices.map(function (device) {
    return {
      children: React__default["default"].createElement(
        "span",
        null,
        device.label
      ),
      checked: isOptionActive(selectedDevice, device.deviceId),
      onClick: function () {
        return selectDevice(device.deviceId);
      },
    };
  });
  return React__default["default"].createElement(ControlBarButton, {
    icon: React__default["default"].createElement(Camera, {
      disabled: !isVideoEnabled,
    }),
    onClick: toggleVideo,
    label: label,
    popOver: dropdownOptions,
  });
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$x =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var ContentTile = styled__default["default"](VideoTile)(
  templateObject_1$x ||
    (templateObject_1$x = __makeTemplateObject$x(
      ["\n  background-color: ", ";\n"],
      ["\n  background-color: ", ";\n"]
    )),
  function (_a) {
    var theme = _a.theme;
    return theme.colors.greys.grey80;
  }
);
var templateObject_1$x;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1G =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1G =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1G.apply(this, arguments);
  };
var __rest$L =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var ContentShare = function (_a) {
  var className = _a.className,
    rest = __rest$L(_a, ["className"]);
  var audioVideo = useAudioVideo();
  var tileId = useContentShareState().tileId;
  var videoEl = React.useRef(null);
  React.useEffect(
    function () {
      if (!audioVideo || !videoEl.current || !tileId) {
        return;
      }
      audioVideo.bindVideoElement(tileId, videoEl.current);
      return function () {
        var tile = audioVideo.getVideoTile(tileId);
        if (tile) {
          audioVideo.unbindVideoElement(tileId);
        }
      };
    },
    [audioVideo, tileId]
  );
  return tileId
    ? React__default["default"].createElement(
        ContentTile,
        __assign$1G(
          { objectFit: "contain", className: className || "" },
          rest,
          { ref: videoEl }
        )
      )
    : null;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useApplyVideoObjectFit(videoEl) {
  React.useEffect(
    function () {
      var _a;
      function onLoaded() {
        if (!videoEl.current) {
          return;
        }
        var height = videoEl.current.videoHeight;
        var width = videoEl.current.videoWidth;
        videoEl.current.style.objectFit = height > width ? "contain" : "cover";
      }
      (_a = videoEl.current) === null || _a === void 0
        ? void 0
        : _a.addEventListener("loadedmetadata", onLoaded);
      return function () {
        var _a;
        return (_a = videoEl.current) === null || _a === void 0
          ? void 0
          : _a.removeEventListener("loadedmetadata", onLoaded);
      };
    },
    [videoEl]
  );
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$y =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __assign$1H =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1H =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1H.apply(this, arguments);
  };
var __rest$M =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var StyledLocalVideo = styled__default["default"](VideoTile)(
  templateObject_1$y ||
    (templateObject_1$y = __makeTemplateObject$y(
      ["\n  ", ";\n"],
      ["\n  ", ";\n"]
    )),
  function (props) {
    return !props.active ? "display: none" : "";
  }
);
var LocalVideo = function (_a) {
  var nameplate = _a.nameplate,
    rest = __rest$M(_a, ["nameplate"]);
  var _b = useLocalVideo(),
    tileId = _b.tileId,
    isVideoEnabled = _b.isVideoEnabled;
  var audioVideo = useAudioVideo();
  var videoEl = React.useRef(null);
  useApplyVideoObjectFit(videoEl);
  var _c = React.useState(function () {
      return audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.hasStartedLocalVideoTile();
    }),
    active = _c[0],
    setActive = _c[1];
  React.useEffect(
    function () {
      if (!audioVideo || !tileId || !videoEl.current || !isVideoEnabled) {
        return;
      }
      audioVideo.bindVideoElement(tileId, videoEl.current);
      return function () {
        var tile = audioVideo.getVideoTile(tileId);
        if (tile) {
          audioVideo.unbindVideoElement(tileId);
        }
      };
    },
    [audioVideo, tileId, isVideoEnabled]
  );
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var observer = {
        videoTileDidUpdate: function (tileState) {
          if (
            !tileState.boundAttendeeId ||
            !tileState.localTile ||
            !tileState.tileId ||
            !videoEl.current
          ) {
            return;
          }
          if (tileState.active !== active) {
            setActive(tileState.active);
          }
        },
      };
      audioVideo.addObserver(observer);
      return function () {
        return audioVideo.removeObserver(observer);
      };
    },
    [audioVideo, active]
  );
  return React__default["default"].createElement(
    StyledLocalVideo,
    __assign$1H({ active: active, nameplate: nameplate, ref: videoEl }, rest)
  );
};
var templateObject_1$y;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$z =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __assign$1I =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1I =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1I.apply(this, arguments);
  };
var __awaiter$e =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator$e =
  (undefined && undefined.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var StyledPreview = styled__default["default"](VideoTile)(
  templateObject_1$z ||
    (templateObject_1$z = __makeTemplateObject$z(
      [
        "\n  height: auto;\n  background: unset;\n\n  video {\n    position: static;\n  }\n",
      ],
      [
        "\n  height: auto;\n  background: unset;\n\n  video {\n    position: static;\n  }\n",
      ]
    ))
);
var PreviewVideo = function (props) {
  var audioVideo = useAudioVideo();
  var videoEl = React.useRef(null);
  var selectedDevice = useVideoInputs().selectedDevice;
  React.useEffect(
    function () {
      if (!audioVideo || !selectedDevice || !videoEl.current) {
        return;
      }
      var mounted = true;
      function startPreview() {
        return __awaiter$e(this, void 0, void 0, function () {
          return __generator$e(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!audioVideo) {
                  return [2 /*return*/];
                }
                return [
                  4 /*yield*/,
                  audioVideo.chooseVideoInputDevice(selectedDevice),
                ];
              case 1:
                _a.sent();
                if (videoEl.current && mounted) {
                  audioVideo.startVideoPreviewForVideoInput(videoEl.current);
                }
                return [2 /*return*/];
            }
          });
        });
      }
      startPreview();
      return function () {
        mounted = false;
        if (videoEl.current) {
          audioVideo.stopVideoPreviewForVideoInput(videoEl.current);
        }
      };
    },
    [audioVideo, selectedDevice]
  );
  return React__default["default"].createElement(
    StyledPreview,
    __assign$1I({}, props, { ref: videoEl })
  );
};
var templateObject_1$z;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1J =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1J =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1J.apply(this, arguments);
  };
var __rest$N =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var RemoteVideo = function (_a) {
  var name = _a.name,
    className = _a.className,
    tileId = _a.tileId,
    rest = __rest$N(_a, ["name", "className", "tileId"]);
  var audioVideo = useAudioVideo();
  var videoEl = React.useRef(null);
  useApplyVideoObjectFit(videoEl);
  React.useEffect(
    function () {
      if (!audioVideo || !videoEl.current) {
        return;
      }
      audioVideo.bindVideoElement(tileId, videoEl.current);
      return function () {
        var tile = audioVideo.getVideoTile(tileId);
        if (tile) {
          audioVideo.unbindVideoElement(tileId);
        }
      };
    },
    [audioVideo, tileId]
  );
  return React__default["default"].createElement(
    VideoTile,
    __assign$1J({}, rest, {
      ref: videoEl,
      nameplate: name,
      className: "ch-remote-video--" + tileId + " " + (className || ""),
    })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1K =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1K =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1K.apply(this, arguments);
  };
var RemoteVideos = function (props) {
  var roster = useRosterState().roster;
  var _a = useRemoteVideoTileState(),
    tiles = _a.tiles,
    tileIdToAttendeeId = _a.tileIdToAttendeeId;
  return React__default["default"].createElement(
    React__default["default"].Fragment,
    null,
    tiles.map(function (tileId) {
      var attendee = roster[tileIdToAttendeeId[tileId]] || {};
      var name = attendee.name;
      return React__default["default"].createElement(
        RemoteVideo,
        __assign$1K({}, props, {
          key: tileId,
          tileId: tileId,
          name: name,
        })
      );
    })
  );
};
React.memo(RemoteVideos);

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1L =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1L =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1L.apply(this, arguments);
  };
var FeaturedRemoteVideos = function (props) {
  var gridData = useGridData();
  var roster = useRosterState().roster;
  var featuredTileId = useFeaturedTileState().tileId;
  var contentTileId = useContentShareState().tileId;
  var _a = useRemoteVideoTileState(),
    tiles = _a.tiles,
    tileIdToAttendeeId = _a.tileIdToAttendeeId;
  return React__default["default"].createElement(
    React__default["default"].Fragment,
    null,
    tiles.map(function (tileId) {
      var featured = !contentTileId && featuredTileId === tileId;
      var styles = gridData && featured ? "grid-area: ft;" : "";
      var classes =
        (featured ? "ch-featured-tile" : "") + " " + (props.className || "");
      var attendee = roster[tileIdToAttendeeId[tileId]] || {};
      var name = attendee.name;
      return React__default["default"].createElement(
        RemoteVideo,
        __assign$1L({ tileId: tileId, name: name }, props, {
          className: classes,
          key: tileId,
          css: styles,
        })
      );
    })
  );
};
React.memo(FeaturedRemoteVideos);

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1M =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1M =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1M.apply(this, arguments);
  };
var __rest$O =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var fluidStyles = "\n  height: 100%;\n  width: 100%;\n";
var staticStyles =
  "\n  display: flex;\n  position: absolute;\n  bottom: 1rem;\n  right: 1rem;\n  width: 20vw;\n  max-height: 30vh;\n  height: auto;\n\n  video {\n    position: static;\n  }\n";
var VideoTileGrid = function (_a) {
  var noRemoteVideoView = _a.noRemoteVideoView,
    _b = _a.layout,
    layout = _b === void 0 ? "featured" : _b,
    rest = __rest$O(_a, ["noRemoteVideoView", "layout"]);
  var featureTileId = useFeaturedTileState().tileId;
  var tiles = useRemoteVideoTileState().tiles;
  var contentTileId = useContentShareState().tileId;
  var isVideoEnabled = useLocalVideo().isVideoEnabled;
  var featured = (layout === "featured" && !!featureTileId) || !!contentTileId;
  var remoteSize = tiles.length + (contentTileId ? 1 : 0);
  var gridSize = remoteSize > 1 && isVideoEnabled ? remoteSize + 1 : remoteSize;
  return React__default["default"].createElement(
    VideoGrid,
    __assign$1M({}, rest, {
      size: gridSize,
      layout: "featured",
    }),
    React__default["default"].createElement(ContentShare, {
      css: "grid-area: ft;",
    }),
    layout === "featured"
      ? React__default["default"].createElement(FeaturedRemoteVideos, null)
      : React__default["default"].createElement(RemoteVideos, null),
    React__default["default"].createElement(LocalVideo, {
      nameplate: "Me",
      css: gridSize > 1 ? fluidStyles : staticStyles,
    }),
    remoteSize === 0 && noRemoteVideoView
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$A =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledMicVolumeIndicator = styled__default["default"].div(
  templateObject_1$A ||
    (templateObject_1$A = __makeTemplateObject$A(
      [
        "\n  position: relative;\n  height: inherit;\n  line-height: 0;\n\n  ",
        "\n\n  .ch-mic-icon {\n    position: relative;\n    z-index: 2;\n    width: 100%;\n  }\n\n  .ch-bg-volume-wrapper {\n    position: absolute;\n    bottom: 41%;\n    left: 40%;\n    height: 38%;\n    width: 21%;\n    border-radius: 20%;\n    overflow: hidden;\n  }\n\n  .ch-bg-volume-fill {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    transform-origin: bottom;\n    will-change: transform;\n    background-color: ",
        ";\n  }\n",
      ],
      [
        "\n  position: relative;\n  height: inherit;\n  line-height: 0;\n\n  ",
        "\n\n  .ch-mic-icon {\n    position: relative;\n    z-index: 2;\n    width: 100%;\n  }\n\n  .ch-bg-volume-wrapper {\n    position: absolute;\n    bottom: 41%;\n    left: 40%;\n    height: 38%;\n    width: 21%;\n    border-radius: 20%;\n    overflow: hidden;\n  }\n\n  .ch-bg-volume-fill {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    transform-origin: bottom;\n    will-change: transform;\n    background-color: ",
        ";\n  }\n",
      ]
    )),
  baseStyles,
  function (props) {
    return props.signalStrength && props.signalStrength <= 0.5
      ? props.theme.colors.error.light
      : props.theme.colors.primary.light;
  }
);
var templateObject_1$A;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1N =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1N =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1N.apply(this, arguments);
  };
var __rest$P =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var MicVolumeIndicator = React.forwardRef(function (_a, bgRef) {
  var _b = _a.muted,
    muted = _b === void 0 ? false : _b,
    signalStrength = _a.signalStrength,
    rest = __rest$P(_a, ["muted", "signalStrength"]);
  var poorConnection = signalStrength !== undefined && signalStrength <= 0.5;
  return React__default["default"].createElement(
    StyledMicVolumeIndicator,
    __assign$1N({}, rest, {
      signalStrength: signalStrength,
      muted: muted,
      className: "ch-mic-volume-indicator",
    }),
    React__default["default"].createElement(Microphone, {
      muted: muted,
      className: "ch-mic-icon",
      poorConnection: poorConnection,
    }),
    React__default["default"].createElement(
      "div",
      { className: "ch-bg-volume-wrapper" },
      React__default["default"].createElement("div", {
        ref: bgRef,
        className: "ch-bg-volume-fill",
        "data-testid": "volume-fill",
      })
    )
  );
});

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useAttendeeAudioStatus(attendeeId) {
  var audioVideo = useAudioVideo();
  var _a = React.useState(false),
    muted = _a[0],
    setMuted = _a[1];
  var _b = React.useState(1),
    signalStrength = _b[0],
    setSignalStrength = _b[1];
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var callback = function (_, __, muted, signalStrength) {
        if (muted !== null) {
          setMuted(muted);
        }
        if (signalStrength !== null) {
          setSignalStrength(signalStrength);
        }
      };
      audioVideo.realtimeSubscribeToVolumeIndicator(attendeeId, callback);
      return function () {
        return audioVideo.realtimeUnsubscribeFromVolumeIndicator(attendeeId);
      };
    },
    [audioVideo, attendeeId]
  );
  return {
    muted: muted,
    signalStrength: signalStrength,
  };
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1O =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1O =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1O.apply(this, arguments);
  };
var __rest$Q =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var MicrophoneActivity = function (_a) {
  var attendeeId = _a.attendeeId,
    rest = __rest$Q(_a, ["attendeeId"]);
  var audioVideo = useAudioVideo();
  var bgEl = React.useRef(null);
  var _b = useAttendeeAudioStatus(attendeeId),
    signalStrength = _b.signalStrength,
    muted = _b.muted;
  React.useEffect(
    function () {
      if (!audioVideo || !attendeeId || !bgEl.current) {
        return;
      }
      audioVideo.realtimeSubscribeToVolumeIndicator(attendeeId, function (
        _,
        volume
      ) {
        if (bgEl.current) {
          bgEl.current.style.transform = "scaleY(" + volume + ")";
        }
      });
      return function () {
        return audioVideo.realtimeUnsubscribeFromVolumeIndicator(attendeeId);
      };
    },
    [attendeeId]
  );
  return React__default["default"].createElement(
    MicVolumeIndicator,
    __assign$1O({}, rest, {
      ref: bgEl,
      muted: muted,
      signalStrength: signalStrength,
    })
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1P =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1P =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1P.apply(this, arguments);
  };
function useAttendeeStatus(attendeeId) {
  var audioVideo = useAudioVideo();
  var audioState = useAttendeeAudioStatus(attendeeId);
  var _a = React.useState(function () {
      var _a, _b, _c;
      if (!audioVideo) {
        return null;
      }
      var localAttendeeId =
        (_c =
          (_b =
            (_a = audioVideo.audioVideoController) === null || _a === void 0
              ? void 0
              : _a.realtimeController) === null || _b === void 0
            ? void 0
            : _b.state) === null || _c === void 0
          ? void 0
          : _c.localAttendeeId;
      var isLocalUser = attendeeId === localAttendeeId;
      var tiles = audioVideo.getAllVideoTiles();
      var videoTile = tiles.find(function (tile) {
        var state = tile.state();
        if (state.isContent || (isLocalUser && !state.active)) {
          return false;
        }
        return state.boundAttendeeId === attendeeId;
      });
      return videoTile ? videoTile.state().tileId : null;
    }),
    videoTileId = _a[0],
    setVideoTileId = _a[1];
  var _b = React.useState(function () {
      if (!audioVideo) {
        return null;
      }
      var tiles = audioVideo.getAllVideoTiles();
      var videoTile = tiles.find(function (tile) {
        var state = tile.state();
        if (!state.boundAttendeeId || !state.isContent) {
          return false;
        }
        var baseId = new amazonChimeSdkJs.DefaultModality(
          state.boundAttendeeId
        ).base();
        return baseId === attendeeId;
      });
      return videoTile ? videoTile.state().tileId : null;
    }),
    contentTileId = _b[0],
    setContentTileId = _b[1];
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var observer = {
        videoTileDidUpdate: function (state) {
          if (state.boundAttendeeId !== attendeeId) {
            return;
          }
          if (state.localTile && videoTileId && !state.boundVideoStream) {
            setVideoTileId(null);
            return;
          }
          if (videoTileId || !state.tileId || state.isContent) {
            return;
          }
          setVideoTileId(state.tileId);
        },
        videoTileWasRemoved: function (tileId) {
          if (tileId === videoTileId) {
            setVideoTileId(null);
          }
        },
      };
      audioVideo.addObserver(observer);
      return function () {
        return audioVideo.removeObserver(observer);
      };
    },
    [audioVideo, videoTileId, attendeeId]
  );
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var observer = {
        videoTileDidUpdate: function (state) {
          if (!state.isContent || !state.boundAttendeeId || contentTileId) {
            return;
          }
          var baseId = new amazonChimeSdkJs.DefaultModality(
            state.boundAttendeeId
          ).base();
          if (baseId !== attendeeId) {
            return;
          }
          setContentTileId(state.tileId);
        },
        videoTileWasRemoved: function (tileId) {
          if (tileId === contentTileId) {
            setContentTileId(null);
          }
        },
      };
      audioVideo.addObserver(observer);
      return function () {
        return audioVideo.removeObserver(observer);
      };
    },
    [audioVideo, contentTileId, attendeeId]
  );
  var videoEnabled = typeof videoTileId === "number" && videoTileId > -1;
  var sharingContent = typeof contentTileId === "number" && contentTileId > -1;
  return __assign$1P(__assign$1P({}, audioState), {
    videoEnabled: videoEnabled,
    sharingContent: sharingContent,
  });
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1Q =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1Q =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1Q.apply(this, arguments);
  };
var __rest$R =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var RosterAttendee = function (_a) {
  var _b;
  var attendeeId = _a.attendeeId,
    rest = __rest$R(_a, ["attendeeId"]);
  var _c = _a.attendeeStatus,
    muted = _c.muted,
    videoEnabled = _c.videoEnabled,
    sharingContent = _c.sharingContent;
  var roster = useRosterState().roster;
  var attendeeName = _a.name;
  return React__default["default"].createElement(
    RosterCell,
    __assign$1Q(
      {
        name: attendeeName,
        muted: muted,
        videoEnabled: videoEnabled,
        sharingContent: sharingContent,
      },
      rest,
      {
        microphone: React__default["default"].createElement(
          MicrophoneActivity,
          { attendeeId: attendeeId }
        ),
      }
    )
  );
};

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
  if (typeof Map !== "undefined") {
    return Map;
  }
  /**
   * Returns index in provided array that matches the specified key.
   *
   * @param {Array<Array>} arr
   * @param {*} key
   * @returns {number}
   */
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function (entry, index) {
      if (entry[0] === key) {
        result = index;
        return true;
      }
      return false;
    });
    return result;
  }
  return /** @class */ (function () {
    function class_1() {
      this.__entries__ = [];
    }
    Object.defineProperty(class_1.prototype, "size", {
      /**
       * @returns {boolean}
       */
      get: function () {
        return this.__entries__.length;
      },
      enumerable: true,
      configurable: true,
    });
    /**
     * @param {*} key
     * @returns {*}
     */
    class_1.prototype.get = function (key) {
      var index = getIndex(this.__entries__, key);
      var entry = this.__entries__[index];
      return entry && entry[1];
    };
    /**
     * @param {*} key
     * @param {*} value
     * @returns {void}
     */
    class_1.prototype.set = function (key, value) {
      var index = getIndex(this.__entries__, key);
      if (~index) {
        this.__entries__[index][1] = value;
      } else {
        this.__entries__.push([key, value]);
      }
    };
    /**
     * @param {*} key
     * @returns {void}
     */
    class_1.prototype.delete = function (key) {
      var entries = this.__entries__;
      var index = getIndex(entries, key);
      if (~index) {
        entries.splice(index, 1);
      }
    };
    /**
     * @param {*} key
     * @returns {void}
     */
    class_1.prototype.has = function (key) {
      return !!~getIndex(this.__entries__, key);
    };
    /**
     * @returns {void}
     */
    class_1.prototype.clear = function () {
      this.__entries__.splice(0);
    };
    /**
     * @param {Function} callback
     * @param {*} [ctx=null]
     * @returns {void}
     */
    class_1.prototype.forEach = function (callback, ctx) {
      if (ctx === void 0) {
        ctx = null;
      }
      for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
        var entry = _a[_i];
        callback.call(ctx, entry[1], entry[0]);
      }
    };
    return class_1;
  })();
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser =
  typeof window !== "undefined" &&
  typeof document !== "undefined" &&
  window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  // eslint-disable-next-line no-new-func
  return Function("return this")();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
  if (typeof requestAnimationFrame === "function") {
    // It's required to use a bounded function because IE sometimes throws
    // an "Invalid calling object" error if rAF is invoked without the global
    // object on the left hand side.
    return requestAnimationFrame.bind(global$1);
  }
  return function (callback) {
    return setTimeout(function () {
      return callback(Date.now());
    }, 1000 / 60);
  };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle(callback, delay) {
  var leadingCall = false,
    trailingCall = false,
    lastCallTime = 0;
  /**
   * Invokes the original callback function and schedules new invocation if
   * the "proxy" was called during current request.
   *
   * @returns {void}
   */
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  /**
   * Callback invoked after the specified delay. It will further postpone
   * invocation of the original function delegating it to the
   * requestAnimationFrame.
   *
   * @returns {void}
   */
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  /**
   * Schedules invocation of the original function.
   *
   * @returns {void}
   */
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      // Reject immediately following calls.
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      // Schedule new call to be in invoked when the pending one is resolved.
      // This is important for "transitions" which never actually start
      // immediately so there is a chance that we might miss one if change
      // happens amids the pending invocation.
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = [
  "top",
  "right",
  "bottom",
  "left",
  "width",
  "height",
  "size",
  "weight",
];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== "undefined";
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
  /**
   * Creates a new instance of ResizeObserverController.
   *
   * @private
   */
  function ResizeObserverController() {
    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    this.connected_ = false;
    /**
     * Tells that controller has subscribed for Mutation Events.
     *
     * @private {boolean}
     */
    this.mutationEventsAdded_ = false;
    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */
    this.mutationsObserver_ = null;
    /**
     * A list of connected observers.
     *
     * @private {Array<ResizeObserverSPI>}
     */
    this.observers_ = [];
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
  }
  /**
   * Adds observer to observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be added.
   * @returns {void}
   */
  ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer);
    }
    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
      this.connect_();
    }
  };
  /**
   * Removes observer from observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be removed.
   * @returns {void}
   */
  ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);
    // Remove observer if it's present in registry.
    if (~index) {
      observers.splice(index, 1);
    }
    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  };
  /**
   * Invokes the update of observers. It will continue running updates insofar
   * it detects changes.
   *
   * @returns {void}
   */
  ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();
    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
      this.refresh();
    }
  };
  /**
   * Updates every observer from observers list and notifies them of queued
   * entries.
   *
   * @private
   * @returns {boolean} Returns "true" if any observer has detected changes in
   *      dimensions of it's elements.
   */
  ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
      return observer.gatherActive(), observer.hasActive();
    });
    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) {
      return observer.broadcastActive();
    });
    return activeObservers.length > 0;
  };
  /**
   * Initializes DOM listeners.
   *
   * @private
   * @returns {void}
   */
  ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
      return;
    }
    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener("transitionend", this.onTransitionEnd_);
    window.addEventListener("resize", this.refresh);
    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    } else {
      document.addEventListener("DOMSubtreeModified", this.refresh);
      this.mutationEventsAdded_ = true;
    }
    this.connected_ = true;
  };
  /**
   * Removes DOM listeners.
   *
   * @private
   * @returns {void}
   */
  ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
      return;
    }
    document.removeEventListener("transitionend", this.onTransitionEnd_);
    window.removeEventListener("resize", this.refresh);
    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }
    if (this.mutationEventsAdded_) {
      document.removeEventListener("DOMSubtreeModified", this.refresh);
    }
    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  };
  /**
   * "Transitionend" event handler.
   *
   * @private
   * @param {TransitionEvent} event
   * @returns {void}
   */
  ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
    var _b = _a.propertyName,
      propertyName = _b === void 0 ? "" : _b;
    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
      return !!~propertyName.indexOf(key);
    });
    if (isReflowProperty) {
      this.refresh();
    }
  };
  /**
   * Returns instance of the ResizeObserverController.
   *
   * @returns {ResizeObserverController}
   */
  ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
      this.instance_ = new ResizeObserverController();
    }
    return this.instance_;
  };
  /**
   * Holds reference to the controller's instance.
   *
   * @private {ResizeObserverController}
   */
  ResizeObserverController.instance_ = null;
  return ResizeObserverController;
})();

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = function (target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true,
    });
  }
  return target;
};

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = function (target) {
  // Assume that the element is an instance of Node, which means that it
  // has the "ownerDocument" property from which we can retrieve a
  // corresponding global object.
  var ownerGlobal =
    target && target.ownerDocument && target.ownerDocument.defaultView;
  // Return the local global object if it's not possible extract one from
  // provided element.
  return ownerGlobal || global$1;
};

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
  return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function (size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
  // Client width & height properties can't be
  // used exclusively as they provide rounded values.
  var clientWidth = target.clientWidth,
    clientHeight = target.clientHeight;
  // By this condition we can catch all non-replaced inline, hidden and
  // detached elements. Though elements with width & height properties less
  // than 0.5 will be discarded as well.
  //
  // Without it we would need to implement separate methods for each of
  // those cases and it's not possible to perform a precise and performance
  // effective test for hidden elements. E.g. even jQuery's ':visible' filter
  // gives wrong results for elements with width & height less than 0.5.
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  // Computed styles of width & height are being used because they are the
  // only dimensions available to JS that contain non-rounded values. It could
  // be possible to utilize the getBoundingClientRect if only it's data wasn't
  // affected by CSS transformations let alone paddings, borders and scroll bars.
  var width = toFloat(styles.width),
    height = toFloat(styles.height);
  // Width & height include paddings and borders when the 'border-box' box
  // model is applied (except for IE).
  if (styles.boxSizing === "border-box") {
    // Following conditions are required to handle Internet Explorer which
    // doesn't include paddings and borders to computed CSS dimensions.
    //
    // We can say that if CSS dimensions + paddings are equal to the "client"
    // properties then it's either IE, and thus we don't need to subtract
    // anything, or an element merely doesn't have paddings/borders styles.
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  // Following steps can't be applied to the document's root element as its
  // client[Width/Height] properties represent viewport area of the window.
  // Besides, it's as well not necessary as the <html> itself neither has
  // rendered scroll bars nor it can be clipped.
  if (!isDocumentElement(target)) {
    // In some browsers (only in Firefox, actually) CSS width & height
    // include scroll bars size which can be removed at this step as scroll
    // bars are the only difference between rounded dimensions + paddings
    // and "client" properties, though that is not always true in Chrome.
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    // Chrome has a rather weird rounding of "client" properties.
    // E.g. for an element with content width of 314.2px it sometimes gives
    // the client width of 315px and for the width of 314.7px it may give
    // 314px. And it doesn't happen all the time. So just ignore this delta
    // as a non-relevant.
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
  // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
  // interface.
  if (typeof SVGGraphicsElement !== "undefined") {
    return function (target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  // If it's so, then check that element is at least an instance of the
  // SVGElement and that it has the "getBBox" method.
  // eslint-disable-next-line no-extra-parens
  return function (target) {
    return (
      target instanceof getWindowOf(target).SVGElement &&
      typeof target.getBBox === "function"
    );
  };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
  var x = _a.x,
    y = _a.y,
    width = _a.width,
    height = _a.height;
  // If DOMRectReadOnly is available use it as a prototype for the rectangle.
  var Constr =
    typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  // Rectangle's properties are not writable and non-enumerable.
  defineConfigurable(rect, {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x,
  });
  return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
  return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
  /**
   * Creates an instance of ResizeObservation.
   *
   * @param {Element} target - Element to be observed.
   */
  function ResizeObservation(target) {
    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    this.broadcastWidth = 0;
    /**
     * Broadcasted height of content rectangle.
     *
     * @type {number}
     */
    this.broadcastHeight = 0;
    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */
    this.contentRect_ = createRectInit(0, 0, 0, 0);
    this.target = target;
  }
  /**
   * Updates content rectangle and tells whether it's width or height properties
   * have changed since the last broadcast.
   *
   * @returns {boolean}
   */
  ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);
    this.contentRect_ = rect;
    return (
      rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight
    );
  };
  /**
   * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
   * from the corresponding properties of the last observed content rectangle.
   *
   * @returns {DOMRectInit} Last observed content rectangle.
   */
  ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;
    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;
    return rect;
  };
  return ResizeObservation;
})();

var ResizeObserverEntry = /** @class */ (function () {
  /**
   * Creates an instance of ResizeObserverEntry.
   *
   * @param {Element} target - Element that is being observed.
   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
   */
  function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);
    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
  }
  return ResizeObserverEntry;
})();

var ResizeObserverSPI = /** @class */ (function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback function that is invoked
   *      when one of the observed elements changes it's content dimensions.
   * @param {ResizeObserverController} controller - Controller instance which
   *      is responsible for the updates of observer.
   * @param {ResizeObserver} callbackCtx - Reference to the public
   *      ResizeObserver instance which will be passed to callback function.
   */
  function ResizeObserverSPI(callback, controller, callbackCtx) {
    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    this.activeObservations_ = [];
    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */
    this.observations_ = new MapShim();
    if (typeof callback !== "function") {
      throw new TypeError(
        "The callback provided as parameter 1 is not a function."
      );
    }
    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
  }
  /**
   * Starts observing provided element.
   *
   * @param {Element} target - Element to be observed.
   * @returns {void}
   */
  ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
      throw new TypeError("1 argument required, but only 0 present.");
    }
    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === "undefined" || !(Element instanceof Object)) {
      return;
    }
    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }
    var observations = this.observations_;
    // Do nothing if element is already being observed.
    if (observations.has(target)) {
      return;
    }
    observations.set(target, new ResizeObservation(target));
    this.controller_.addObserver(this);
    // Force the update of observations.
    this.controller_.refresh();
  };
  /**
   * Stops observing provided element.
   *
   * @param {Element} target - Element to stop observing.
   * @returns {void}
   */
  ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
      throw new TypeError("1 argument required, but only 0 present.");
    }
    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === "undefined" || !(Element instanceof Object)) {
      return;
    }
    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }
    var observations = this.observations_;
    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
      return;
    }
    observations.delete(target);
    if (!observations.size) {
      this.controller_.removeObserver(this);
    }
  };
  /**
   * Stops observing all elements.
   *
   * @returns {void}
   */
  ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  };
  /**
   * Collects observation instances the associated element of which has changed
   * it's content rectangle.
   *
   * @returns {void}
   */
  ResizeObserverSPI.prototype.gatherActive = function () {
    var _this = this;
    this.clearActive();
    this.observations_.forEach(function (observation) {
      if (observation.isActive()) {
        _this.activeObservations_.push(observation);
      }
    });
  };
  /**
   * Invokes initial callback function with a list of ResizeObserverEntry
   * instances collected from active resize observations.
   *
   * @returns {void}
   */
  ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
      return;
    }
    var ctx = this.callbackCtx_;
    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
      return new ResizeObserverEntry(
        observation.target,
        observation.broadcastRect()
      );
    });
    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
  };
  /**
   * Clears the collection of active observations.
   *
   * @returns {void}
   */
  ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
  };
  /**
   * Tells whether observer has active observations.
   *
   * @returns {boolean}
   */
  ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
  };
  return ResizeObserverSPI;
})();

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback that is invoked when
   *      dimensions of the observed elements change.
   */
  function ResizeObserver(callback) {
    if (!(this instanceof ResizeObserver)) {
      throw new TypeError("Cannot call a class as a function.");
    }
    if (!arguments.length) {
      throw new TypeError("1 argument required, but only 0 present.");
    }
    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);
    observers.set(this, observer);
  }
  return ResizeObserver;
})();
// Expose public methods of ResizeObserver.
["observe", "unobserve", "disconnect"].forEach(function (method) {
  ResizeObserver.prototype[method] = function () {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});

var index = (function () {
  // Export existing implementation if available.
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver;
})();

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {number}    delay -          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {boolean}   [noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset).
 * @param  {Function}  callback -       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {boolean}   [debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @returns {Function}  A new, throttled, function.
 */
function throttle$1(delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec

  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.

  if (typeof noTrailing !== "boolean") {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */

  function wrapper() {
    for (
      var _len = arguments.length, arguments_ = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      arguments_[_key] = arguments[_key];
    }

    var self = this;
    var elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.

    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */

    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      );
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

/* eslint-disable no-undefined */
/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {number}   delay -         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {boolean}  [atBegin] -     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback -      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @returns {Function} A new, debounced function.
 */

function debounce$1(delay, atBegin, callback) {
  return callback === undefined
    ? throttle$1(delay, atBegin, false)
    : throttle$1(delay, callback, atBegin !== false);
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Todo - Use a defined range per aspect ratio, instead of the specific ratio value
function getAspectRatio(height, width) {
  var aspectRatio = width / height;
  if (aspectRatio > 1.6) {
    return "r16by9";
  }
  if (aspectRatio > 1.4) {
    return "r3by2";
  }
  if (aspectRatio > 1.25) {
    return "r4by3";
  }
  if (aspectRatio > 0.9) {
    return "r1by1";
  }
  if (aspectRatio > 0.7) {
    return "r2by3";
  }
  if (aspectRatio > 0.4) {
    return "r1by2";
  }
  return "slim";
}
var useElementAspectRatio = function (ref) {
  var _a = React.useState(null),
    ratio = _a[0],
    setRatio = _a[1];
  React.useLayoutEffect(function () {
    if (!ref.current) {
      return;
    }
    var _a = ref.current.getBoundingClientRect(),
      height = _a.height,
      width = _a.width;
    setRatio(getAspectRatio(height, width));
  }, []);
  React.useEffect(function () {
    if (!ref.current) {
      return;
    }
    var handleResize = debounce$1(50, function (entries) {
      var _a = entries[0].contentRect,
        height = _a.height,
        width = _a.width;
      setRatio(getAspectRatio(height, width));
    });
    var resizeObserver = new index(handleResize);
    resizeObserver.observe(ref.current);
    return function () {
      return resizeObserver.disconnect();
    };
  }, []);
  return ratio;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function useActiveSpeakersState() {
  var meetingManager = useMeetingManager();
  var _a = React.useState([]),
    activeSpeakers = _a[0],
    setActiveSpeakers = _a[1];
  React.useEffect(function () {
    var activeSpeakerCb = function (speakers) {
      return setActiveSpeakers(speakers);
    };
    meetingManager.subscribeToActiveSpeaker(activeSpeakerCb);
    return function () {
      return meetingManager.unsubscribeFromActiveSpeaker(activeSpeakerCb);
    };
  }, []);
  return activeSpeakers;
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var useMeetingStatus = function () {
  var meetingManager = useMeetingManager();
  var _a = React.useState(function () {
      return meetingManager.meetingStatus;
    }),
    meetingStatus = _a[0],
    setMeetingStatus = _a[1];
  React.useEffect(function () {
    var callback = function (updatedMeetingStatus) {
      setMeetingStatus(updatedMeetingStatus);
    };
    meetingManager.subscribeToMeetingStatus(callback);
    return function () {
      meetingManager.unsubscribeFromMeetingStatus(callback);
    };
  }, []);
  return meetingStatus;
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var useLocalAudioInputActivity = function (cb) {
  var audioVideo = useAudioVideo();
  var selectedDevice = useAudioInputs().selectedDevice;
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var analyserNode;
      var restart = false;
      var data;
      var frameIndex;
      var isMounted = true;
      var lastDecimal;
      audioVideo.addDeviceChangeObserver({
        audioInputsChanged: function () {
          restart = true;
        },
      });
      function initializePreview() {
        if (!audioVideo || !isMounted) return;
        analyserNode = audioVideo.createAnalyserNodeForAudioInput();
        if (
          !(analyserNode === null || analyserNode === void 0
            ? void 0
            : analyserNode.getByteTimeDomainData)
        ) {
          return;
        }
        data = new Uint8Array(analyserNode.fftSize);
        frameIndex = 0;
        restart = false;
        requestAnimationFrame(analyserNodeCallback);
      }
      function analyserNodeCallback() {
        if (!analyserNode) {
          return;
        }
        if (frameIndex === 0) {
          analyserNode.getByteTimeDomainData(data);
          var lowest = 0.01;
          var max = lowest;
          for (var _i = 0, _a = data; _i < _a.length; _i++) {
            var f = _a[_i];
            max = Math.max(max, (f - 128) / 128);
          }
          var decimal = (Math.log(lowest) - Math.log(max)) / Math.log(lowest);
          if (lastDecimal !== decimal) {
            lastDecimal = decimal;
            if (cb) {
              cb(decimal);
            }
          }
        }
        frameIndex = (frameIndex + 1) % 2;
        if (restart) {
          setTimeout(initializePreview, 500);
        } else if (isMounted) {
          requestAnimationFrame(analyserNodeCallback);
        }
      }
      initializePreview();
      return function () {
        isMounted = false;
      };
    },
    [audioVideo, selectedDevice, cb]
  );
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
var useLocalAudioInputActivityPreview = function (elementRef, scaleDirection) {
  if (scaleDirection === void 0) {
    scaleDirection = "horizontal";
  }
  var cb = React.useCallback(
    function (decimal) {
      if (elementRef.current) {
        elementRef.current.style.transform =
          scaleDirection === "horizontal"
            ? "scaleX(" + decimal + ")"
            : "scaleY(" + decimal + ")";
      }
    },
    [scaleDirection]
  );
  useLocalAudioInputActivity(cb);
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
function isValidMetric(metric) {
  return typeof metric === "number" && !Number.isNaN(metric);
}
function useBandwidthMetrics() {
  var audioVideo = useAudioVideo();
  var _a = React.useState({
      availableOutgoingBandwidth: null,
      availableIncomingBandwidth: null,
    }),
    metrics = _a[0],
    setMetrics = _a[1];
  React.useEffect(
    function () {
      if (!audioVideo) {
        return;
      }
      var observer = {
        metricsDidReceive: function (clientMetricReport) {
          var metricReport = clientMetricReport.getObservableMetrics();
          var availableOutgoingBandwidth = null;
          var availableIncomingBandwidth = null;
          if (isValidMetric(metricReport.availableSendBandwidth)) {
            availableOutgoingBandwidth =
              metricReport.availableSendBandwidth / 1000;
          } else if (isValidMetric(metricReport.availableOutgoingBitrate)) {
            availableOutgoingBandwidth =
              metricReport.availableOutgoingBitrate / 1000;
          }
          if (isValidMetric(metricReport.availableReceiveBandwidth)) {
            availableIncomingBandwidth =
              metricReport.availableReceiveBandwidth / 1000;
          } else if (isValidMetric(metricReport.availableIncomingBitrate)) {
            availableIncomingBandwidth =
              metricReport.availableIncomingBitrate / 1000;
          }
          setMetrics({
            availableOutgoingBandwidth: availableOutgoingBandwidth,
            availableIncomingBandwidth: availableIncomingBandwidth,
          });
        },
      };
      audioVideo.addObserver(observer);
      return function () {
        return audioVideo.removeObserver(observer);
      };
    },
    [audioVideo]
  );
  return metrics;
}

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var fonts = {
  body:
    "'Ember', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;",
  monospace: "Menlo, monospace",
};
var radii = {
  default: "0.25rem",
  circle: "50%",
};
var zIndex = {
  navigation: 10,
  controlBar: 15,
  modal: 20,
  popOver: 30,
  notificationGroup: 40,
};
var breakpoints = ["20rem", "35.5rem", "48rem", "64rem", "90rem"];
breakpoints.xs = breakpoints[0];
breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
breakpoints.xl = breakpoints[4];
var mediaQueries = {
  min: {
    xs: "@media screen and (min-width: " + breakpoints.xs + ")",
    sm: "@media screen and (min-width: " + breakpoints.sm + ")",
    md: "@media screen and (min-width: " + breakpoints.md + ")",
    lg: "@media screen and (min-width: " + breakpoints.lg + ")",
    xl: "@media screen and (min-width: " + breakpoints.xl + ")",
  },
  max: {
    xs: "@media screen and (max-width: " + breakpoints.xs + ")",
    sm: "@media screen and (max-width: " + breakpoints.sm + ")",
    md: "@media screen and (max-width: " + breakpoints.md + ")",
    lg: "@media screen and (max-width: " + breakpoints.lg + ")",
    xl: "@media screen and (max-width: " + breakpoints.xl + ")",
  },
};
var fontSizes = {
  baseFontSize: "16px",
  fontWeight: "normal",
  h1: {
    fontSize: "5.3rem",
    fontWeight: "normal",
    lineHeight: "5.625rem",
    mobile: {
      fontSize: "3.8125rem",
      fontWeight: "normal",
      lineHeight: "5.625rem",
    },
  },
  h2: {
    fontSize: "3.925rem",
    fontWeight: "normal",
    lineHeight: "3.75rem",
    mobile: {
      fontSize: "3.05rem",
      fontWeight: "normal",
      lineHeight: "4.5rem",
    },
  },
  h3: {
    fontSize: "2.44125rem",
    fontWeight: "normal",
    lineHeight: "3.75rem",
    mobile: {
      fontSize: "2.90625rem",
      fontWeight: "normal",
      lineHeight: "3rem",
    },
  },
  h4: {
    fontSize: "1.953125rem",
    fontWeight: "normal",
    lineHeight: "3.75rem",
    mobile: {
      fontSize: "2.15rem",
      fontWeight: "normal",
      lineHeight: "3rem",
    },
  },
  h5: {
    fontSize: "1.5625rem",
    fontWeight: "normal",
    lineHeight: "3rem",
    mobile: {
      fontSize: "1.59375rem",
      fontWeight: "normal",
      lineHeight: "1.875rem",
    },
  },
  h6: {
    fontSize: "1.25rem",
    fontWeight: "normal",
    lineHeight: "1.875rem",
    mobile: {
      fontSize: "1.18125rem",
      fontWeight: "normal",
      lineHeight: "1.5rem",
    },
  },
  text: {
    fontSize: "0.875rem",
    lineHeight: "1.43",
  },
  label: {
    fontSize: "0.875rem",
    lineHeight: "1.43",
  },
  small: {
    fontSize: "0.75rem",
    lineHeight: "1.43",
  },
  footnote: {
    fontSize: "0.65rem",
    lineHeight: "1rem",
  },
};
var modalSizes = {
  md: {
    width: "35rem",
    height: "94vh",
  },
  lg: {
    width: "50rem",
    height: "94vh",
  },
  fullscreen: {
    width: "98vw",
    height: "96vh",
  },
};
var iconButtonSizes = {
  sm: "1.5rem",
  md: "2.5rem",
  lg: "4rem",
};
var defaultTheme = {
  breakpoints: breakpoints,
  mediaQueries: mediaQueries,
  fonts: fonts,
  fontSizes: fontSizes,
  radii: radii,
  zIndex: zIndex,
  modalSizes: modalSizes,
  iconButtonSizes: iconButtonSizes,
};

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1R =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1R =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1R.apply(this, arguments);
  };
var colors = {
  primary: {
    lightest: "#88b2ff",
    lighter: "#5d96ff",
    light: "#327aff",
    main: "#075fff",
    dark: "#004ddb",
    darker: "#0042bb",
    darkest: "#002f85",
  },
  secondary: {
    light: "#ff8e74",
    main: "#ff7654",
    dark: "#e86c4d",
  },
  error: {
    lightest: "#FCF7F6",
    lighter: "#F5DDD5",
    light: "#FF927C",
    primary: "#C52000",
    dark: "#9E3319",
    darker: "#89301A",
    darkest: "#791800",
  },
  success: {
    lightest: "#EBF1EA",
    lighter: "#CEE0C8",
    light: "#50CD49",
    primary: "#067000",
    dark: "#305D1D",
    darker: "#2C511D",
    darkest: "#184206",
  },
  info: {
    lightest: "#DADFE7",
    lighter: "#C4CCD9",
    light: "#418AFD",
    primary: "#2555A0",
    dark: "#264A82",
    darker: "#243F6B",
    darkest: "#123366",
  },
  warning: {
    lightest: "#FAF8EA",
    lighter: "#F7E79E",
    light: "#F9DC60",
    primary: "#F9CC09",
    dark: "#665A2A",
    darker: "#584E26",
    darkest: "#534201",
  },
  greys: {
    black: "#000000",
    grey100: "#1b1c20",
    grey90: "#2e2f34",
    grey80: "#3f4149",
    grey70: "#50545e",
    grey60: "#616672",
    grey50: "#7d818b",
    grey40: "#989da5",
    grey30: "#d4d5d8",
    grey20: "#e4e9f2",
    grey10: "#f0f1f2",
    white: "#ffffff",
  },
};
var global$2 = {
  bgd: colors.greys.white,
  text: colors.greys.grey80,
  fontSize: defaultTheme.fontSizes.baseFontSize,
};
var shadows = {
  none: "none",
  small: "0 0.09375rem 0.0625rem 0 " + hexTorgba(colors.greys.grey100, 0.15),
  medium: "0 0.5rem 0.85rem 0 " + hexTorgba(colors.greys.black, 0.15),
  large: "0 0.75rem 1.875rem 0 " + hexTorgba(colors.greys.black, 0.15),
};
var buttons = {
  primary: {
    shadow: shadows.none,
    static: {
      bgd: colors.primary.light,
      border: "0.03125rem solid " + colors.primary.darker,
      text: colors.greys.white,
      shadow: "none",
    },
    hover: {
      bgd: colors.primary.dark,
      border: "0.03125rem solid " + colors.primary.darkest,
      text: colors.greys.white,
      shadow: "none",
    },
    focus: {
      bgd: colors.primary.dark,
      border: "0.03125rem solid " + colors.primary.darker,
      text: colors.greys.white,
      shadow: "0 0 0 0.25rem " + colors.primary.lightest,
    },
    active: {
      bgd: colors.primary.darker,
      border: "0.03125rem solid " + colors.greys.black,
      text: colors.greys.white,
      shadow: "0 0 0 0.25rem " + colors.primary.lightest,
    },
    selected: {
      bgd: colors.primary.light,
      border: "0.03125rem solid " + colors.primary.dark,
      text: colors.greys.white,
      shadow: "none",
    },
    disabled: {
      bgd: colors.greys.white,
      border: "0.03125rem solid " + colors.greys.grey10,
      text: colors.greys.grey40,
      shadow: "none",
    },
  },
  secondary: {
    shadow: shadows.none,
    static: {
      bgd: colors.greys.white,
      border: "0.03125rem solid " + colors.greys.grey30,
      text: colors.greys.grey80,
      shadow: "none",
    },
    hover: {
      bgd: colors.greys.grey10,
      border: "0.03125rem solid " + colors.greys.grey30,
      text: colors.greys.grey80,
      shadow: "none",
    },
    focus: {
      bgd: colors.greys.grey10,
      border: "0.03125rem solid " + colors.primary.dark,
      text: colors.greys.grey80,
      shadow: "0 0 0 0.25rem " + colors.primary.light,
    },
    active: {
      bgd: colors.greys.grey20,
      border: "0.03125rem solid " + colors.greys.grey40,
      text: colors.greys.grey80,
      shadow: "0 0 0 0.25rem " + colors.primary.dark,
    },
    selected: {
      bgd: colors.greys.grey10,
      border: "0.03125rem solid " + colors.greys.grey30,
      text: colors.greys.grey80,
      shadow: "0 0 0 0.25rem " + colors.primary.dark,
    },
    disabled: {
      bgd: colors.greys.white,
      border: "0.03125rem solid " + colors.greys.grey10,
      text: colors.greys.grey40,
      shadow: "none",
    },
  },
  icon: {
    shadow: shadows.none,
    static: {
      bgd: "transparent",
      border: "0.03125rem  solid transparent",
      text: colors.greys.grey80,
      shadow: "none",
    },
    hover: {
      bgd: colors.primary.dark,
      border: "0.03125rem  solid transparent",
      text: colors.greys.white,
      shadow: "none",
    },
    focus: {
      bgd: "transparent",
      border: "0.03125rem  solid " + colors.primary.darker,
      text: colors.greys.grey80,
      shadow: "0 0 0 0.25rem " + colors.primary.lightest,
    },
    active: {
      bgd: colors.primary.darker,
      border: "0.03125rem  solid " + colors.primary.darker,
      text: colors.greys.white,
      shadow: "0 0 0 0.25rem " + colors.primary.lightest,
    },
    selected: {
      bgd: colors.primary.light,
      border: "0.03125rem  solid " + colors.primary.darker,
      text: colors.greys.white,
      shadow: "none",
    },
    disabled: {
      bgd: "transparent",
      border: "none",
      text: colors.greys.grey40,
      shadow: "none",
    },
  },
};
var inputs = {
  bgd: colors.greys.white,
  border: "0.03125rem solid " + colors.greys.grey30,
  borderRadius: defaultTheme.radii.default,
  fontColor: colors.greys.grey80,
  placeholder: colors.greys.grey40,
  shadow: "0 0.0625rem 0.0625rem 0 " + hexTorgba(colors.greys.black, 0.1),
  clearBg: colors.greys.grey50,
  focus: {
    bgd: colors.greys.white,
    border: "solid 0.03125rem " + colors.primary.lighter,
    shadow: "0 0 0 0.125rem " + colors.primary.lightest,
  },
  error: {
    border: "0.03125rem solid " + colors.error.dark,
    fontColor: colors.error.primary,
    shadow: "0 0 0 0.125rem " + colors.error.light,
  },
  checked: {
    bgd: colors.primary.main,
    border: "solid 0.03125rem " + colors.primary.main,
    fontColor: colors.greys.white,
    shadow: "0 0.03125rem 0.03125rem 0 " + hexTorgba(colors.primary.dark, 0.7),
  },
};
var modal = {
  bgd: colors.greys.white,
  text: colors.greys.grey80,
  wrapperBgd: hexTorgba(colors.greys.grey50, 0.9),
  titleSize: defaultTheme.fontSizes.h5.fontSize,
  titleWeight: "normal",
  shadow: shadows.large,
  border: colors.greys.grey30,
};
var popOver = {
  menuBgd: "" + hexTorgba(colors.greys.grey10, 0.85),
  menuBorder: "0.5px solid " + colors.greys.grey20,
  shadow: shadows.large,
  itemBgd: "transparent",
  itemText: colors.greys.grey70,
  titleText: colors.greys.grey60,
  active: {
    itemBgd: colors.primary.dark,
    itemText: colors.greys.white,
  },
  separator: "" + hexTorgba(colors.greys.grey40, 0.3),
};
var notification = {
  shadow: shadows.large,
  error: {
    text: colors.error.lightest,
    closeButton: {
      text: colors.error.lighter,
      hover: {
        bgd: colors.error.lighter,
        text: colors.error.dark,
      },
      active: {
        bgd: colors.error.lightest,
        text: colors.error.darker,
      },
    },
  },
  success: {
    text: colors.success.lightest,
    closeButton: {
      text: colors.success.lighter,
      hover: {
        bgd: colors.success.lighter,
        text: colors.success.dark,
      },
      active: {
        bgd: colors.success.lightest,
        text: colors.success.darker,
      },
    },
  },
  info: {
    text: colors.info.lightest,
    closeButton: {
      text: colors.info.lighter,
      hover: {
        bgd: colors.info.lighter,
        text: colors.info.dark,
      },
      active: {
        bgd: colors.info.lightest,
        text: colors.info.darker,
      },
    },
  },
  warning: {
    text: colors.warning.darker,
    closeButton: {
      text: colors.warning.dark,
      hover: {
        bgd: colors.warning.dark,
        text: colors.greys.white,
      },
      active: {
        bgd: colors.warning.darker,
        text: colors.greys.white,
      },
    },
  },
};
var links = {
  fontColor: colors.primary.main,
  fontColorHover: colors.primary.dark,
  fontColorActive: colors.primary.darker,
  fontColorVisited: colors.primary.darkest,
};
var controlBar = {
  text: colors.greys.grey70,
  shadow: shadows.large,
  bgd: colors.greys.white,
  border: "0.03125rem solid " + colors.greys.grey20,
  opacity: 0.95,
  selected: {
    text: buttons.primary.selected.text,
    bgd: buttons.primary.selected.bgd,
  },
};
var roster = {
  title: colors.greys.grey100,
  primaryText: colors.greys.grey80,
  secondaryText: colors.greys.grey50,
  headerBorder: colors.greys.grey40,
  containerBorder: colors.greys.grey30,
  bgd: colors.greys.grey10,
  fgd: colors.greys.white,
  shadow: shadows.large,
  maxWidth: "18.5rem",
};
var navbar = {
  text: colors.greys.grey80,
  bgd: colors.greys.grey10,
  headerBorder: colors.greys.grey40,
  wrapperBgd: hexTorgba(colors.greys.grey50, 0.9),
};
var videoGrid = {
  bgd: colors.greys.white,
};
var chatBubble = {
  incoming: {
    bgd: colors.greys.white,
    fontColor: colors.greys.grey60,
  },
  outgoing: {
    bgd: colors.primary.light,
    fontColor: colors.greys.grey10,
  },
  container: {
    fontColor: colors.greys.grey70,
    bgd: colors.greys.grey10,
  },
};
var messageAttachment = {
  size: {
    fontColor: colors.greys.grey40,
    bgd: colors.greys.white,
    letterSpacing: "-0.07px",
    lineHight: "16px",
    fontSize: "10.4px",
  },
  icon: {
    bgd: colors.greys.grey10,
    color: colors.greys.grey80,
  },
  name: {
    fontColor: colors.greys.grey80,
  },
  content: {
    letterSpacing: "-0.09px",
    bgd: colors.greys.white,
    fontColor: colors.greys.grey80,
  },
};
var channelList = {
  bgd: colors.greys.white,
  fontColor: colors.greys.grey70,
  border: "1px solid transparent",
  active: {
    bgd: colors.primary.dark,
    fontColor: colors.greys.white,
  },
  hover: {
    bgd: colors.greys.grey10,
  },
  focus: {
    border: "1px solid " + colors.primary.dark,
    selectedBorder: "1px solid " + colors.greys.grey10,
  },
  selected: {
    bgd: colors.primary.light,
    fontColor: colors.greys.white,
  },
  iconButton: {
    activeBgd: colors.greys.white,
  },
};
var chatDateHeader = {
  bgd: colors.greys.grey60,
  fontColor: colors.greys.white,
};
var lightTheme = __assign$1R(
  {
    name: "Light Theme",
    buttons: buttons,
    colors: colors,
    global: global$2,
    links: links,
    shadows: shadows,
    inputs: inputs,
    modal: modal,
    popOver: popOver,
    notification: notification,
    controlBar: controlBar,
    roster: roster,
    navbar: navbar,
    videoGrid: videoGrid,
    chatBubble: chatBubble,
    channelList: channelList,
    chatDateHeader: chatDateHeader,
    messageAttachment: messageAttachment,
  },
  defaultTheme
);

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign$1S =
  (undefined && undefined.__assign) ||
  function () {
    __assign$1S =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign$1S.apply(this, arguments);
  };
var colors$1 = {
  primary: {
    lightest: "#9DEFFB",
    lighter: "#8AEBFA",
    light: "#62E5F9",
    main: "#4FE2F8",
    dark: "#29DCF8",
    darker: "#22B6CB",
    darkest: "#1FA1B5",
  },
  secondary: {
    light: "#FF8B70",
    main: "#FF9B83",
    dark: "#FFB4A1",
  },
  error: {
    lightest: "#FBC1C0",
    lighter: "#FDA8A6",
    light: "#FD9B99",
    primary: "#FF8B8A",
    dark: "#583A39",
    darker: "#452F2E",
    darkest: "#302020",
  },
  success: {
    lightest: "#F4FBF1",
    lighter: "#D2F1C5",
    light: "#BAF39E",
    primary: "#A3E881",
    dark: "#4F6444",
    darker: "#46573D",
    darkest: "#324129",
  },
  info: {
    lightest: "#F0F5FD",
    lighter: "#D8E6FB",
    light: "#C4DBFF",
    primary: "#BAD4FF",
    dark: "#555B69",
    darker: "#494F59",
    darkest: "#343C48",
  },
  warning: {
    lightest: "#FDFDF7",
    lighter: "#3F4149",
    light: "#FFEB96",
    primary: "#FBDF64",
    dark: "#6D653C",
    darker: "#5E5736",
    darkest: "#47422D",
  },
  greys: {
    black: "#000000",
    grey100: "#1b1c20",
    grey90: "#2e2f34",
    grey80: "#3f4149",
    grey70: "#50545e",
    grey60: "#616672",
    grey50: "#7d818b",
    grey40: "#989da5",
    grey30: "#d4d5d8",
    grey20: "#e4e9f2",
    grey10: "#f0f1f2",
    white: "#ffffff",
  },
};
var global$3 = {
  bgd: colors$1.greys.grey80,
  text: colors$1.greys.white,
  fontSize: defaultTheme.fontSizes.baseFontSize,
};
var shadows$1 = {
  none: "none",
  small: "",
  medium: "",
  large: "0 0.75rem 1.875rem 0 " + hexTorgba(colors$1.greys.black, 0.15),
};
var buttons$1 = {
  primary: {
    shadow: shadows$1.none,
    static: {
      bgd: colors$1.primary.main,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "none",
    },
    hover: {
      bgd: colors$1.primary.dark,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "none",
    },
    focus: {
      bgd: colors$1.primary.dark,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "0 0 0 0.25rem " + colors$1.primary.darkest,
    },
    active: {
      bgd: colors$1.primary.darker,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "none",
    },
    selected: {
      bgd: colors$1.primary.light,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "none",
    },
    disabled: {
      bgd: colors$1.greys.grey80,
      border: "0.03125rem solid " + hexTorgba(colors$1.greys.black, 0.4),
      text: colors$1.greys.grey40,
      shadow: "none",
    },
  },
  secondary: {
    shadow: shadows$1.none,
    static: {
      bgd: colors$1.greys.grey50,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.white,
      shadow: "none",
    },
    hover: {
      bgd: colors$1.greys.grey60,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.white,
      shadow: "none",
    },
    focus: {
      bgd: colors$1.greys.grey60,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.white,
      shadow: "0 0 0 0.25rem " + colors$1.primary.lighter,
    },
    active: {
      bgd: colors$1.greys.grey70,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.white,
      shadow: "none",
    },
    selected: {
      bgd: colors$1.greys.grey60,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.white,
      shadow: "none",
    },
    disabled: {
      bgd: colors$1.greys.grey80,
      border: "0.03125rem solid " + hexTorgba(colors$1.greys.black, 0.6),
      text: colors$1.greys.grey40,
      shadow: "none",
    },
  },
  icon: {
    shadow: shadows$1.none,
    static: {
      bgd: "transparent",
      border: "0 solid " + colors$1.greys.black,
      text: colors$1.greys.grey20,
      shadow: "none",
    },
    hover: {
      bgd: colors$1.primary.dark,
      border: "0.03125rem  solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "none",
    },
    focus: {
      bgd: "transparent",
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "0 0 0 0.25rem " + colors$1.primary.darker,
    },
    active: {
      bgd: colors$1.primary.darker,
      border: "0.03125rem solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "none",
    },
    selected: {
      bgd: colors$1.primary.light,
      border: "0 solid " + colors$1.greys.black,
      text: colors$1.greys.grey80,
      shadow: "none",
    },
    disabled: {
      bgd: "transparent",
      border: "none",
      text: colors$1.greys.grey40,
      shadow: "none",
    },
  },
};
var inputs$1 = {
  bgd: colors$1.greys.grey80,
  border: "0.03125rem solid " + colors$1.greys.black,
  borderRadius: defaultTheme.radii.default,
  fontColor: colors$1.greys.white,
  placeholder: colors$1.greys.grey50,
  shadow: "0 0.0625rem 0.0625rem 0 " + hexTorgba(colors$1.greys.black, 0.1),
  clearBg: colors$1.greys.white,
  focus: {
    bgd: colors$1.greys.white,
    border: "solid 0.03125rem " + colors$1.primary.main,
    shadow: "0 0 0 0.125rem " + colors$1.primary.lighter,
  },
  error: {
    border: "0.03125rem solid " + colors$1.error.primary,
    fontColor: colors$1.error.primary,
    shadow: "0 0 0 0.125rem " + colors$1.error.light,
  },
  checked: {
    bgd: colors$1.primary.main,
    border: "solid 0.03125rem " + colors$1.primary.dark,
    fontColor: colors$1.greys.grey80,
    shadow: "inset 0 0.03125rem 0 0 " + hexTorgba(colors$1.greys.white, 0.1),
  },
};
var modal$1 = {
  bgd: colors$1.greys.grey80,
  text: colors$1.greys.white,
  wrapperBgd: hexTorgba(colors$1.greys.grey60, 0.9),
  titleSize: defaultTheme.fontSizes.h5.fontSize,
  titleWeight: "normal",
  shadow:
    "0 1rem 2rem 0 rgba(0, 0, 0, " +
    hexTorgba(colors$1.greys.black, 0.15) +
    ")",
  border: colors$1.greys.black,
};
var popOver$1 = {
  menuBgd: "" + hexTorgba(colors$1.greys.grey90, 0.85),
  menuBorder: colors$1.greys.grey100,
  shadow: shadows$1.large,
  itemBgd: "transparent",
  itemText: colors$1.greys.white,
  titleText: colors$1.greys.white,
  active: {
    itemBgd: colors$1.primary.dark,
    itemText: colors$1.greys.grey80,
  },
  separator: colors$1.greys.grey100,
};
var notification$1 = {
  shadow: shadows$1.large,
  error: {
    text: colors$1.error.darker,
    closeButton: {
      text: colors$1.error.dark,
      hover: {
        bgd: colors$1.error.dark,
        text: colors$1.greys.white,
      },
      active: {
        bgd: colors$1.error.darker,
        text: colors$1.greys.white,
      },
    },
  },
  success: {
    text: colors$1.success.darker,
    closeButton: {
      text: colors$1.success.dark,
      hover: {
        bgd: colors$1.success.dark,
        text: colors$1.greys.white,
      },
      active: {
        bgd: colors$1.success.darker,
        text: colors$1.greys.white,
      },
    },
  },
  info: {
    text: colors$1.info.darker,
    closeButton: {
      text: colors$1.info.dark,
      hover: {
        bgd: colors$1.info.dark,
        text: colors$1.greys.white,
      },
      active: {
        bgd: colors$1.info.darker,
        text: colors$1.greys.white,
      },
    },
  },
  warning: {
    text: colors$1.warning.darker,
    closeButton: {
      text: colors$1.warning.dark,
      hover: {
        bgd: colors$1.warning.dark,
        text: colors$1.greys.white,
      },
      active: {
        bgd: colors$1.warning.darker,
        text: colors$1.greys.white,
      },
    },
  },
};
var links$1 = {
  fontColor: colors$1.primary.main,
  fontColorHover: colors$1.primary.dark,
  fontColorActive: colors$1.primary.darker,
  fontColorVisited: colors$1.primary.darkest,
};
var controlBar$1 = {
  text: colors$1.greys.grey20,
  shadow: shadows$1.large,
  bgd: colors$1.greys.grey100,
  border: "none",
  opacity: 1,
  selected: {
    text: buttons$1.primary.selected.text,
    bgd: buttons$1.primary.selected.bgd,
  },
};
var roster$1 = {
  title: colors$1.greys.white,
  primaryText: colors$1.greys.white,
  secondaryText: colors$1.greys.grey20,
  headerBorder: colors$1.greys.black,
  containerBorder: colors$1.greys.black,
  bgd: colors$1.greys.grey100,
  fgd: colors$1.greys.grey60,
  shadow: shadows$1.large,
  maxWidth: "18.5rem",
};
var navbar$1 = {
  text: colors$1.greys.white,
  bgd: colors$1.greys.grey100,
  headerBorder: colors$1.greys.black,
  wrapperBgd: hexTorgba(colors$1.greys.grey60, 0.9),
};
var videoGrid$1 = {
  bgd: colors$1.greys.grey90,
};
var chatBubble$1 = {
  incoming: {
    bgd: colors$1.greys.grey80,
    fontColor: colors$1.greys.grey30,
  },
  outgoing: {
    bgd: colors$1.primary.dark,
    fontColor: colors$1.greys.grey70,
  },
  container: {
    fontColor: colors$1.greys.grey30,
    bgd: colors$1.greys.black,
  },
};
var messageAttachment$1 = {
  size: {
    fontColor: colors$1.greys.grey30,
    bgd: colors$1.greys.grey10,
    letterSpacing: "-0.07px",
    lineHight: "16px",
    fontSize: "10.4px",
  },
  icon: {
    bgd: colors$1.greys.grey40,
    color: colors$1.greys.grey10,
  },
  name: {
    fontColor: colors$1.greys.white,
  },
  content: {
    letterSpacing: "-0.09px",
    bgd: colors$1.greys.grey60,
    fontColor: colors$1.greys.white,
  },
};
var channelList$1 = {
  bgd: colors$1.greys.grey80,
  fontColor: colors$1.greys.grey10,
  border: "1px solid transparent",
  active: {
    bgd: colors$1.primary.dark,
    fontColor: colors$1.greys.grey70,
  },
  hover: {
    bgd: colors$1.greys.grey70,
  },
  focus: {
    border: "1px solid " + colors$1.primary.dark,
    selectedBorder: "1px solid " + colors$1.greys.grey70,
  },
  selected: {
    bgd: colors$1.primary.light,
    fontColor: colors$1.greys.grey70,
  },
  iconButton: {
    activeBgd: colors$1.greys.grey80,
  },
};
var chatDateHeader$1 = {
  bgd: colors$1.greys.grey10,
  fontColor: colors$1.greys.grey80,
};
var darkTheme = __assign$1S(
  {
    name: "Dark Theme",
    buttons: buttons$1,
    colors: colors$1,
    global: global$3,
    links: links$1,
    shadows: shadows$1,
    inputs: inputs$1,
    modal: modal$1,
    popOver: popOver$1,
    notification: notification$1,
    controlBar: controlBar$1,
    roster: roster$1,
    navbar: navbar$1,
    videoGrid: videoGrid$1,
    chatBubble: chatBubble$1,
    channelList: channelList$1,
    chatDateHeader: chatDateHeader$1,
    messageAttachment: messageAttachment$1,
  },
  defaultTheme
);

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$B =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var StyledReset = styled.css(
  templateObject_1$B ||
    (templateObject_1$B = __makeTemplateObject$B(
      [
        "\n  /* http://meyerweb.com/eric/tools/css/reset/\n    v2.0 | 20110126\n    License: none (public domain)\n  */\n\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed,\n  figure, figcaption, footer, header, hgroup,\n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n  }\n  /* HTML5 display-role reset for older browsers */\n  article, aside, details, figcaption, figure,\n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n  body {\n    line-height: 1;\n  }\n  ol, ul {\n    list-style: none;\n  }\n  blockquote, q {\n    quotes: none;\n  }\n  blockquote:before, blockquote:after,\n  q:before, q:after {\n    content: '';\n    content: none;\n  }\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n\n",
      ],
      [
        "\n  /* http://meyerweb.com/eric/tools/css/reset/\n    v2.0 | 20110126\n    License: none (public domain)\n  */\n\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed,\n  figure, figcaption, footer, header, hgroup,\n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n  }\n  /* HTML5 display-role reset for older browsers */\n  article, aside, details, figcaption, figure,\n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n  body {\n    line-height: 1;\n  }\n  ol, ul {\n    list-style: none;\n  }\n  blockquote, q {\n    quotes: none;\n  }\n  blockquote:before, blockquote:after,\n  q:before, q:after {\n    content: '';\n    content: none;\n  }\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n\n",
      ]
    ))
);
var templateObject_1$B;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __makeTemplateObject$C =
  (undefined && undefined.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var GlobalStyles = styled.createGlobalStyle(
  templateObject_1$C ||
    (templateObject_1$C = __makeTemplateObject$C(
      [
        "\n  ",
        ";\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n\n  html {\n    font-size: ",
        ";\n    font-family: ",
        ";;\n    background-color: ",
        ";\n    color: ",
        ";\n    min-height: 100%;\n  }\n",
      ],
      [
        "\n  ",
        ";\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n\n  html {\n    font-size: ",
        ";\n    font-family: ",
        ";;\n    background-color: ",
        ";\n    color: ",
        ";\n    min-height: 100%;\n  }\n",
      ]
    )),
  StyledReset,
  function (props) {
    return props.theme.fontSizes.baseFontSize;
  },
  function (props) {
    return props.theme.fonts.body;
  },
  function (props) {
    return props.theme.global.bgd;
  },
  function (props) {
    return props.theme.global.text;
  }
);
var templateObject_1$C;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var Versioning = /** @class */ (function () {
  function Versioning() {}
  Object.defineProperty(Versioning, "sdkName", {
    /**
     * Return string representation of SDK name
     */
    get: function () {
      return "amazon-chime-sdk-component-library-react";
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(Versioning, "sdkVersion", {
    /**
     * Return string representation of SDK version
     */
    get: function () {
      return "1.6.0";
    },
    enumerable: false,
    configurable: true,
  });
  return Versioning;
})();

exports.Add = Add;
exports.Arrow = Arrow;
exports.Attachment = Attachment;
exports.Attendees = Attendees;
exports.AudioInputControl = AudioInputControl;
exports.AudioOutputControl = AudioOutputControl;
exports.AudioVideoContext = AudioVideoContext;
exports.AudioVideoProvider = AudioVideoProvider;
exports.Badge = Badge;
exports.Button = Button;
exports.Camera = Camera;
exports.CameraSelection = CameraSelection;
exports.Caret = Caret;
exports.Caution = Caution;
exports.Cell = Cell;
exports.ChannelItem = ChannelItem;
exports.ChannelList = ChannelList;
exports.Chat = Chat;
exports.ChatBubble = ChatBubble;
exports.ChatBubbleContainer = ChatBubbleContainer;
exports.Check = Check;
exports.CheckRound = CheckRound;
exports.Checkbox = Checkbox;
exports.Clear = Clear;
exports.Clock = Clock;
exports.Cog = Cog;
exports.ContentTile = ContentTile;
exports.ConnectionProblem = ConnectionProblem;
exports.ContentShare = ContentShare;
exports.ContentShareControl = ContentShareControl;
exports.ContentShareProvider = ContentShareProvider;
exports.ControlBar = ControlBar;
exports.ControlBarButton = ControlBarButton;
exports.ControlBarContext = ControlBarContext;
exports.Crown = Crown;
exports.DeskPhone = DeskPhone;
exports.DevicesProvider = DevicesProvider;
exports.Dialer = Dialer;
exports.Dislike = Dislike;
exports.Dock = Dock;
exports.Document = Document;
exports.Dots = Dots;
exports.DropToAttach = DropToAttach;
exports.Echo = Echo;
exports.EditableChatBubble = EditableChatBubble;
exports.EmojiPicker = EmojiPicker;
exports.Eye = Eye;
exports.FeaturedRemoteVideos = FeaturedRemoteVideos;
exports.FeaturedVideoTileProvider = FeaturedVideoTileProvider;
exports.Feedback = Feedback;
exports.Flex = Flex;
exports.FormField = FormField;
exports.GlobalStyles = GlobalStyles;
exports.Grid = Grid;
exports.Hamburger = Hamburger;
exports.HandRaise = HandRaise;
exports.Heading = Heading;
exports.IconButton = IconButton;
exports.InfiniteList = InfiniteList;
exports.Information = Information;
exports.Input = Input;
exports.InputWrapper = InputWrapper;
exports.KEY_CODES = KEY_CODES;
exports.Label = Label;
exports.Laptop = Laptop;
exports.LeaveMeeting = LeaveMeeting;
exports.Like = Like;
exports.ListHandRaise = ListHandRaise;
exports.LocalAudioOutputProvider = LocalAudioOutputProvider;
exports.LocalVideo = LocalVideo;
exports.LocalVideoProvider = LocalVideoProvider;
exports.Lock = Lock;
exports.Meeting = Meeting;
exports.MeetingManager = MeetingManager;
exports.MeetingProvider = MeetingProvider;
exports.MessageAttachment = MessageAttachment;
exports.MicSelection = MicSelection;
exports.Microphone = Microphone;
exports.MicrophoneActivity = MicrophoneActivity;
exports.Modal = Modal;
exports.ModalBody = ModalBody;
exports.ModalButton = ModalButton;
exports.ModalButtonGroup = ModalButtonGroup;
exports.ModalContext = ModalContext;
exports.ModalHeader = ModalHeader;
exports.Navbar = Navbar;
exports.NavbarHeader = NavbarHeader;
exports.NavbarItem = NavbarItem;
exports.Notification = Notification;
exports.NotificationGroup = NotificationGroup;
exports.NotificationProvider = NotificationProvider;
exports.Pause = Pause;
exports.Phone = Phone;
exports.Pin = Pin;
exports.Play = Play;
exports.PopOver = PopOver;
exports.PopOverHeader = PopOverHeader;
exports.PopOverItem = PopOverItem;
exports.PopOverSeparator = PopOverSeparator;
exports.PopOverSubMenu = PopOverSubMenu;
exports.Portal = Portal;
exports.Presenter = Presenter;
exports.PreviewVideo = PreviewVideo;
exports.PrimaryButton = PrimaryButton;
exports.QualitySelection = QualitySelection;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.Record = Record;
exports.RemoteVideo = RemoteVideo;
exports.RemoteVideoTileProvider = RemoteVideoTileProvider;
exports.RemoteVideos = RemoteVideos;
exports.Remove = Remove;
exports.Rooms = Rooms;
exports.Roster = Roster;
exports.RosterAttendee = RosterAttendee;
exports.RosterCell = RosterCell;
exports.RosterGroup = RosterGroup;
exports.RosterHeader = RosterHeader;
exports.RosterProvider = RosterProvider;
exports.ScreenShare = ScreenShare;
exports.Search = Search;
exports.SearchInput = SearchInput;
exports.SecondaryButton = SecondaryButton;
exports.Select = Select;
exports.Share = Share;
exports.SignalStrength = SignalStrength;
exports.Sound = Sound;
exports.SpeakerSelection = SpeakerSelection;
exports.Spinner = Spinner;
exports.StyledReset = StyledReset;
exports.Textarea = Textarea;
exports.UpAndDownCaret = UpAndDownCaret;
exports.UserActivityManager = UserActivityManager;
exports.UserActivityProvider = UserActivityProvider;
exports.Versioning = Versioning;
exports.VideoGrid = VideoGrid;
exports.VideoInputControl = VideoInputControl;
exports.VideoTile = VideoTile;
exports.VideoTileGrid = VideoTileGrid;
exports.darkTheme = darkTheme;
exports.formatDate = formatDate;
exports.formatTime = formatTime;
exports.lightTheme = lightTheme;
exports.useActiveSpeakersState = useActiveSpeakersState;
exports.useApplyVideoObjectFit = useApplyVideoObjectFit;
exports.useAttendeeAudioStatus = useAttendeeAudioStatus;
exports.useAttendeeStatus = useAttendeeStatus;
exports.useAudioInputs = useAudioInputs;
exports.useAudioOutputs = useAudioOutputs;
exports.useAudioVideo = useAudioVideo;
exports.useBandwidthMetrics = useBandwidthMetrics;
exports.useClickOutside = useClickOutside;
exports.useContentShareControls = useContentShareControls;
exports.useContentShareState = useContentShareState;
exports.useControlBarContext = useControlBarContext;
exports.useElementAspectRatio = useElementAspectRatio;
exports.useFeaturedTileState = useFeaturedTileState;
exports.useFocusIn = useFocusIn;
exports.useLocalAudioInputActivity = useLocalAudioInputActivity;
exports.useLocalAudioInputActivityPreview = useLocalAudioInputActivityPreview;
exports.useLocalAudioOutput = useLocalAudioOutput;
exports.useLocalVideo = useLocalVideo;
exports.useMeetingManager = useMeetingManager;
exports.useMeetingStatus = useMeetingStatus;
exports.useModalContext = useModalContext;
exports.useMouseMove = useMouseMove;
exports.useNotificationDispatch = useNotificationDispatch;
exports.useNotificationState = useNotificationState;
exports.useRemoteVideoTileState = useRemoteVideoTileState;
exports.useRosterState = useRosterState;
exports.useSelectAudioInputDevice = useSelectAudioInputDevice;
exports.useSelectAudioOutputDevice = useSelectAudioOutputDevice;
exports.useSelectVideoInputDevice = useSelectVideoInputDevice;
exports.useSelectVideoQuality = useSelectVideoQuality;
exports.useTabOutside = useTabOutside;
exports.useToggleLocalMute = useToggleLocalMute;
exports.useUniqueId = useUniqueId;
exports.useUserActivityState = useUserActivityState;
exports.useVideoInputs = useVideoInputs;
//# sourceMappingURL=index.js.map
