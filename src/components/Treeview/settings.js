import { getThemeProp } from "utils";

// Functions to easily get the tree settings from theme, or sensible defaults
export const branchIndent = getThemeProp(["treeSettings", "branchIndent"], 14);
export const branchLength = getThemeProp(["treeSettings", "branchLength"], 15);
export const branchHeight = getThemeProp(["treeSettings", "branchHeight"], 18);
