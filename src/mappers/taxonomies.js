export const separateTable = (table, condition = val => !!val ) =>
  table.reduce((acc, current) => {
    if (condition(current)) {
      acc.truthy.push(current);
    } else {
      acc.falsy.push(current);
    }
    return acc;
  }, { truthy: [], falsy: [] });


const buildLevel = (allTaxonomies, branch) => {
  const related = separateTable(allTaxonomies, ({ parent: { id } }) => branch.id === id);
  return {
    ...branch,
    children: related.truthy
      .map(taxonomy => buildLevel(related.falsy, taxonomy)),
  };
};

export const buildTree = taxonomies => {
  const roots = separateTable(taxonomies, ({ parent }) => parent === null);
  return roots.truthy.map(taxonomy => buildLevel(roots.falsy, taxonomy));
};
