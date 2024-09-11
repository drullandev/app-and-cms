import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import MyComponent from './MyComponent';
/**
 * Painting a page row ;)
 * @param param0
 * @returns
 */
const testing = false;
const PageRow = ({ menu, component, content }) => {
    if (testing)
        console.log('PageRowProps', { menu, component });
    const returnComponent = () => {
        if (!component)
            return;
        return component &&
            _jsx(MyComponent, { name: component.name, slug: component.slug, content: content });
    };
    return (_jsx(_Fragment, {}));
};
export default PageRow;
