import { ref, onMounted, onBeforeUnmount } from 'vue';

export const useLocalTime = timezoneOffset => {
  const localTime = ref('');
  let clockTimer = null;

  const updateLocalTime = () => {
    const offset = timezoneOffset ?? 0;
    const d = new Date((Date.now() / 1000 + offset) * 1000);
    const hh = String(d.getUTCHours()).padStart(2, '0');
    const mm = String(d.getUTCMinutes()).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = d.getUTCFullYear();
    localTime.value = `${hh}:${mm} ${dd}/${mo}/${yyyy}`;
  };

  onMounted(() => {
    updateLocalTime();
    clockTimer = setInterval(updateLocalTime, 10000);
  });

  onBeforeUnmount(() => {
    clearInterval(clockTimer);
  });

  return {
    localTime,
    updateLocalTime,
  };
};
