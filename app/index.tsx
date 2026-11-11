import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { getProducts } from '../services/products.service';
import type { Product } from '../types/product';

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      setProducts(await getProducts());
    } catch (e) {
  console.log('ERROR:', e);
  setError('No se pudieron cargar los productos. Intenta otra vez.');
} finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

if (selected) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 48, gap: 12 }}>
      <Button title="Volver" onPress={() => setSelected(null)} />
      <Image source={{ uri: selected.imagen }} style={{ width: '100%', height: 250 }} resizeMode="contain" />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selected.nombre}</Text>
      <Text>${selected.precio}</Text>
      <Text>Categoría: {selected.categoria}</Text>
      <Text>{selected.descripcion}</Text>
    </ScrollView>
  );
}

  if (loading) return <ActivityIndicator style={{ marginTop: 60 }} size="large" />;
  if (error) {
    return (
      <View style={{ padding: 24, gap: 12 }}>
        <Text>{error}</Text>
        <Button title="Reintentar" onPress={cargar} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(p) => String(p.id)}
      contentContainerStyle={{ padding: 12, gap: 12 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => setSelected(item)}
          style={{ padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
          <Image source={{ uri: item.imagen }} style={{ width: '100%', height: 160 }} resizeMode="contain" />
          <Text style={{ fontWeight: 'bold', marginTop: 8 }}>{item.nombre}</Text>
          <Text>${item.precio}</Text>
        </Pressable>
      )}
    />
  );
}