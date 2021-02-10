export const search = (
  type,
  records,
  expertiseValue,
  searchValue,
  experienceValue
) => {
  const expertiseFilter = expertiseValue.length > 0;
  const experienceFilter = experienceValue.length > 0;
  let filterCondition = null;

  return records.filter((record) => {
    const expertiseString = record.fields["Expertise"].reduce((acc, curr) => {
      return acc + " " + curr;
    }, "");
    const experienceString =
      type === "talent"
        ? record.fields["Years of Experience"][0]
        : record.fields["Years of Marketing Experience"][0];

    const helpString = record.fields["How I'd Like to Help"]
      ? record.fields["How I'd Like to Help"].reduce((acc, curr) => {
          return acc + " " + curr;
        }, "")
      : "";

    const searchString =
      type === "talent"
        ? `${record.fields["Name"]}
            ${record.fields["Where I've Worked"]}
            ${record.fields["Short Bio"]}
            ${expertiseString}
            ${experienceString}`
        : `${record.fields["Name"]}
            ${record.fields["Where I've Worked"]}
            ${record.fields["Short Bio"]}
            ${expertiseString}
            ${experienceString}
            ${helpString}`;

    if (expertiseFilter && !experienceFilter) {
      filterCondition =
        searchString.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 &&
        expertiseString.toLowerCase().indexOf(expertiseValue.toLowerCase()) >
          -1;
    } else if (!expertiseFilter && experienceFilter) {
      filterCondition =
        searchString.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 &&
        experienceString.toLowerCase().indexOf(experienceValue.toLowerCase()) >
          -1;
    } else if (expertiseFilter && experienceFilter) {
      filterCondition =
        searchString.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 &&
        experienceString.toLowerCase().indexOf(experienceValue.toLowerCase()) >
          -1 &&
        expertiseString.toLowerCase().indexOf(expertiseValue.toLowerCase()) >
          -1;
    } else {
      filterCondition =
        searchString.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    }
    return filterCondition;
  });
};

export const filterByExpertise = (
  type,
  records,
  expertiseValue,
  searchValue,
  experienceValue
) => {
  const experienceFilter = experienceValue.length > 0;
  const searchFilter = searchValue.length > 0;

  let filterCondition = null;

  return records.filter((record) => {
    const expertiseString = record.fields["Expertise"].reduce((acc, curr) => {
      return acc + " " + curr;
    }, "");
    const experienceString =
      type === "talent"
        ? record.fields["Years of Experience"][0]
        : record.fields["Years of Marketing Experience"][0];

    const helpString = record.fields["How I'd Like to Help"]
      ? record.fields["How I'd Like to Help"].reduce((acc, curr) => {
          return acc + " " + curr;
        }, "")
      : "";

    const searchString =
      type === "talent"
        ? `${record.fields["Name"]}
            ${record.fields["Where I've Worked"]}
            ${record.fields["Short Bio"]}
            ${expertiseString}
            ${experienceString}`
        : `${record.fields["Name"]}
            ${record.fields["Where I've Worked"]}
            ${record.fields["Short Bio"]}
            ${expertiseString}
            ${experienceString}
            ${helpString}`;

    if (experienceFilter && !searchFilter) {
      filterCondition =
        experienceString.toLowerCase().indexOf(experienceValue.toLowerCase()) >
          -1 &&
        expertiseString.toLowerCase().indexOf(expertiseValue.toLowerCase()) >
          -1;
    } else if (searchFilter && !experienceFilter) {
      filterCondition =
        searchString.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 &&
        expertiseString.toLowerCase().indexOf(expertiseValue.toLowerCase()) >
          -1;
    } else if (searchFilter && experienceFilter) {
      filterCondition =
        searchString.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 &&
        experienceString.toLowerCase().indexOf(experienceValue.toLowerCase()) >
          -1 &&
        expertiseString.toLowerCase().indexOf(expertiseValue.toLowerCase()) >
          -1;
    } else {
      filterCondition =
        expertiseString.toLowerCase().indexOf(expertiseValue.toLowerCase()) >
        -1;
    }
    return filterCondition;
  });
};

export const filterByExperience = (
  type,
  records,
  expertiseValue,
  searchValue,
  experienceValue
) => {
  const expertiseFilter = expertiseValue.length > 0;
  const searchFilter = searchValue.length > 0;

  let filterCondition = null;

  return records.filter((record) => {
    const expertiseString = record.fields["Expertise"].reduce((acc, curr) => {
      return acc + " " + curr;
    }, "");
    const experienceString =
      type === "talent"
        ? record.fields["Years of Experience"][0]
        : record.fields["Years of Marketing Experience"][0];

    const helpString = record.fields["How I'd Like to Help"]
      ? record.fields["How I'd Like to Help"].reduce((acc, curr) => {
          return acc + " " + curr;
        }, "")
      : "";

    const searchString =
      type === "talent"
        ? `${record.fields["Name"]}
            ${record.fields["Where I've Worked"]}
            ${record.fields["Short Bio"]}
            ${expertiseString}
            ${experienceString}`
        : `${record.fields["Name"]}
            ${record.fields["Where I've Worked"]}
            ${record.fields["Short Bio"]}
            ${expertiseString}
            ${experienceString}
            ${helpString}`;

    if (expertiseFilter && !searchFilter) {
      filterCondition =
        expertiseString.toLowerCase().indexOf(expertiseValue.toLowerCase()) >
          -1 &&
        experienceString.toLowerCase().indexOf(experienceValue.toLowerCase()) >
          -1;
    } else if (searchFilter && !expertiseFilter) {
      filterCondition =
        searchString.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 &&
        experienceString.toLowerCase().indexOf(experienceValue.toLowerCase()) >
          -1;
    } else if (searchFilter && expertiseFilter) {
      filterCondition =
        searchString.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 &&
        experienceString.toLowerCase().indexOf(experienceValue.toLowerCase()) >
          -1 &&
        expertiseString.toLowerCase().indexOf(expertiseValue.toLowerCase()) >
          -1;
    } else {
      console.log(experienceValue, filterCondition);
      filterCondition =
        experienceString.toLowerCase().indexOf(experienceValue.toLowerCase()) >
        -1;
    }
    return filterCondition;
  });
};
