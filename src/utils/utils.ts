export const calculateAge = (dob: Date) => {
  const now = new Date();
  const diff = now.getTime() - dob.getTime();

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = (diff % 1000).toString().padStart(3, "0");

  return { years, days, hours, minutes, seconds, milliseconds };
};
