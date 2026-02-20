import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Bu sayfa artık kullanılmıyor.
// Tüm rotalar doğrudan /tour-detail?id=... sayfasına yönlendiriliyor.
export default function DestinationDetailRedirect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      router.replace(`/tour-detail?id=${id}`);
    } else {
      router.back();
    }
  }, [id]);

  return null;
}
