export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

export const shortenTitle = (title: string): string => {
  if (title.length <= 30) {
    return title;
  } else {
    return title.slice(0, 30) + "...";
  }
};

export const shortenExcerpt = (title: string): string => {
  if (title.length <= 100) {
    return title;
  } else {
    return title.slice(0, 100) + "...";
  }
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};
