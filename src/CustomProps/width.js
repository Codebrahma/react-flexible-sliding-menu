// This is a factory function (also called a higher-order function)
function createCustomWidthPropType(isRequired) {
  // The factory returns a custom prop type
  return function(props, propName, componentName) {
    const { width } = props;
    if (width == null) {
      // Prop is missing
      if (isRequired) {
        // Prop is required but wasn't specified. Throw an error.
        throw new Error(
          `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
        );
      }
      // Prop is optional. Do nothing.
    } else {
      const validCSSDimension = /^(\d+|\d*\.\d+)(px|rem|em|%|vw|vh|cm|mm|Q|in|pc|pt|ex|ch|lh|vmin|vmax)$/;
      if (!validCSSDimension.test(width)) {
        return new Error(
          `Invalid prop \`${propName}\` of value \`${width}\` supplied to \`${componentName}\`, expected a valid css length with unit (https://developer.mozilla.org/en-US/docs/Web/CSS/length).`
        );
      }
    }
    return null;
  };
}

// Using the factory, create two different versions of your prop type
const widthPropType = createCustomWidthPropType(false);
widthPropType.isRequired = createCustomWidthPropType(true);

export default widthPropType;
