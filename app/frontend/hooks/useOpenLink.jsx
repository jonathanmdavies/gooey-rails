export default function useOpenLink(item) {
  const openLink = () => {
    window.open(item.permalink, "_blank");
  };
  return { openLink };
}
