import ComponentProps from "orc-shared/src/components/MaterialUI/componentProps";

class TableProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		padding: "padding",
		size: "size",
		stickyHeader: "stickyHeader",
	};

	static ruleNames = {
		root: "root",
		stickyHeader: "stickyHeader",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.component, null);
		this.componentProps.set(this.constructor.propNames.padding, null);
		this.componentProps.set(this.constructor.propNames.size, null);
		this.componentProps.set(this.constructor.propNames.stickyHeader, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.stickyHeader, null);
	}
}

class TableBodyProps extends ComponentProps {
	static propNames = {
		classes: "classes",
	};

	static ruleNames = {
		root: "root",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.component, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
	}
}

class TableCellProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		align: "align",
		padding: "padding",
		scope: "scope",
		size: "size",
		sortDirection: "sortDirection",
	};

	static ruleNames = {
		root: "root",
		head: "head",
		body: "body",
		footer: "footer",
		sizeSmall: "sizeSmall",
		paddingCheckbox: "paddingCheckbox",
		paddingNone: "paddingNone",
		alignLeft: "alignLeft",
		alignCenter: "alignCenter",
		alignRight: "alignRight",
		alignJustify: "alignJustify",
		stickyHeader: "stickyHeader",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.align, null);
		this.componentProps.set(this.constructor.propNames.component, null);
		this.componentProps.set(this.constructor.propNames.padding, null);
		this.componentProps.set(this.constructor.propNames.scope, null);
		this.componentProps.set(this.constructor.propNames.size, null);
		this.componentProps.set(this.constructor.propNames.sortDirection, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.head, null);
		this.componentClasses.set(this.constructor.ruleNames.body, null);
		this.componentClasses.set(this.constructor.ruleNames.footer, null);
		this.componentClasses.set(this.constructor.ruleNames.sizeSmall, null);
		this.componentClasses.set(this.constructor.ruleNames.paddingCheckbox, null);
		this.componentClasses.set(this.constructor.ruleNames.paddingNone, null);
		this.componentClasses.set(this.constructor.ruleNames.alignLeft, null);
		this.componentClasses.set(this.constructor.ruleNames.alignCenter, null);
		this.componentClasses.set(this.constructor.ruleNames.alignRight, null);
		this.componentClasses.set(this.constructor.ruleNames.alignJustify, null);
		this.componentClasses.set(this.constructor.ruleNames.stickyHeader, null);
	}
}

class TableContainerProps extends ComponentProps {
	static propNames = {
		classes: "classes",
	};

	static ruleNames = {
		root: "root",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.component, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
	}
}

class TableFooterProps extends ComponentProps {
	static propNames = {
		classes: "classes",
	};

	static ruleNames = {
		root: "root",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.component, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
	}
}

class TableHeadProps extends ComponentProps {
	static propNames = {
		classes: "classes",
	};

	static ruleNames = {
		root: "root",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.component, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
	}
}

class TablePaginationProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		backIconButtonProps: "backIconButtonProps",
		backIconButtonText: "backIconButtonText",
		count: "count",
		labelDisplayedRows: "labelDisplayedRows",
		labelRowsPerPage: "labelRowsPerPage",
		nextIconButtonProps: "nextIconButtonProps",
		nextIconButtonText: "nextIconButtonText",
		onChangePage: "onChangePage",
		onChangeRowsPerPage: "onChangeRowsPerPage",
		page: "page",
		rowsPerPage: "number",
		rowsPerPageOptions: "rowsPerPageOptions",
		selectProps: "SelectProps",
	};

	static ruleNames = {
		root: "root",
		toolbar: "toolbar",
		spacer: "spacer",
		caption: "caption",
		selectRoot: "selectRoot",
		select: "select",
		selectIcon: "selectIcon",
		input: "input",
		menuItem: "menuItem",
		actions: "actions",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.backIconButtonProps, null);
		this.componentProps.set(this.constructor.propNames.backIconButtonText, null);
		this.componentProps.set(this.constructor.propNames.count, null);
		this.componentProps.set(this.constructor.propNames.labelDisplayedRows, null);
		this.componentProps.set(this.constructor.propNames.labelRowsPerPage, null);
		this.componentProps.set(this.constructor.propNames.nextIconButtonProps, null);
		this.componentProps.set(this.constructor.propNames.nextIconButtonText, null);
		this.componentProps.set(this.constructor.propNames.onChangePage, null);
		this.componentProps.set(this.constructor.propNames.onChangeRowsPerPage, null);
		this.componentProps.set(this.constructor.propNames.page, null);
		this.componentProps.set(this.constructor.propNames.rowsPerPage, null);
		this.componentProps.set(this.constructor.propNames.rowsPerPageOptions, null);
		this.componentProps.set(this.constructor.propNames.selectProps, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.toolbar, null);
		this.componentClasses.set(this.constructor.ruleNames.spacer, null);
		this.componentClasses.set(this.constructor.ruleNames.caption, null);
		this.componentClasses.set(this.constructor.ruleNames.selectRoot, null);
		this.componentClasses.set(this.constructor.ruleNames.select, null);
		this.componentClasses.set(this.constructor.ruleNames.selectIcon, null);
		this.componentClasses.set(this.constructor.ruleNames.input, null);
		this.componentClasses.set(this.constructor.ruleNames.menuItem, null);
		this.componentClasses.set(this.constructor.ruleNames.actions, null);
	}
}

class TableRowProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		hover: "hover",
		selected: "selected",
	};

	static ruleNames = {
		root: "root",
		selected: "selected",
		hover: "hover",
		head: "head",
		footer: "footer",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.hover, null);
		this.componentProps.set(this.constructor.propNames.selected, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.selected, null);
		this.componentClasses.set(this.constructor.ruleNames.hover, null);
		this.componentClasses.set(this.constructor.ruleNames.head, null);
		this.componentClasses.set(this.constructor.ruleNames.footer, null);
	}
}

class TableSortLabelProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		active: "active",
		direction: "direction",
		hideSortIcon: "hideSortIcon",
		iconComponent: "IconComponent",
	};

	static ruleNames = {
		root: "root",
		active: "active",
		icon: "icon",
		iconDirectionDesc: "iconDirectionDesc",
		iconDirectionAsc: "iconDirectionAsc",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.active, null);
		this.componentProps.set(this.constructor.propNames.direction, null);
		this.componentProps.set(this.constructor.propNames.hideSortIcon, null);
		this.componentProps.set(this.constructor.propNames.IconComponent, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.active, null);
		this.componentClasses.set(this.constructor.ruleNames.icon, null);
		this.componentClasses.set(this.constructor.ruleNames.iconDirectionDesc, null);
		this.componentClasses.set(this.constructor.ruleNames.iconDirectionAsc, null);
	}
}

export {
	TableProps,
	TableBodyProps,
	TableCellProps,
	TableContainerProps,
	TableFooterProps,
	TableHeadProps,
	TablePaginationProps,
	TableRowProps,
	TableSortLabelProps,
};
