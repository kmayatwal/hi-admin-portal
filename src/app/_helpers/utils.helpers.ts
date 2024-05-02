export function formatName(data: any, type: string) {
  let name = "--";
  if (data.firstName && data.lastName && data.title) {
    name = `${data.title} ${data.firstName} ${data.lastName}`;
  } else if (data.title && data.firstName) {
    name = `${data.title} ${data.firstName}`;
  } else if (data.firstName) {
    name = `${data.firstName}`;
  }

  if (type.includes("capital")) {
    return name.toUpperCase();
  } else {
    return name;
  }
}

export function formatDate(date, format: string) {
  let formattedDate = "--";
  if (date) {
    const my_date = new Date(date);
    let options: Intl.DateTimeFormatOptions;

    if (format === "dd-MM-yyyy") {
      // will format date as 20/12/2023
      formattedDate = new Intl.DateTimeFormat("en-GB")
        .format(my_date)
        .replace(/\//g, "-");
    } else if (format === "dd/MM/yy at H:mm") {
      // will format date as 31/01/23 2:30 pm
      options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      formattedDate = new Intl.DateTimeFormat("en-GB", options)
        .format(my_date)
        .replace(",", " at");
    } else if (format === "yyyy-MM-dd") {
      // will format date as 2023-01-31
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      let year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    } else if (format === "dd-mm-yy") {
      // will format date as 01 Jan 23
      options = {
        year: "2-digit",
        month: "short",
        day: "2-digit",
      };
      formattedDate = new Intl.DateTimeFormat("en-GB", options).format(my_date);
    }else if (format === "mm yy") {
      // will format date as Jan 23
      options = {
        year: "2-digit",
        month: "short",
      };
      formattedDate = new Intl.DateTimeFormat("en-GB", options).format(my_date);
    }
  }

  return formattedDate;
}
