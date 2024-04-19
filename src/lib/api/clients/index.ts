import AuthClient from './auth';
import TenantsClient from './tenants';
import TagsClient from './tags';
import ProductsClient from './products';
import TagGroupsClient from './tag_groups';
import MenuSortClient from './menu_sort';

export default {
	auth: new AuthClient(),
	tenants: new TenantsClient(),
	tags: new TagsClient(),
	products: new ProductsClient(),
	tagGroups: new TagGroupsClient(),
	menuSort: new MenuSortClient()
};
