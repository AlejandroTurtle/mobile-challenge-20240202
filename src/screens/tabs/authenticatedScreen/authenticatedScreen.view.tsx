import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomButton } from '../../../components/CustomButton';
import { CustomInput } from '../../../components/CustomInput';
import { Text } from '../../../components/Text';
import ListView from './components/ListView';
import useAuthenticatedScreen from './useAuthenticatedScreen';
import HistoryView from './components/HistoryView';
import FavoriteView from './components/FavoriteView';

export default function AuthenticatedScreenView() {
  const {
    handleListItemPress,
    handleWordSearch,
    handleSignOut,
    activeMenu,
    setActiveMenu,
    isSigningOut,
    searchWord,
    setSearchWord,
    menus,
  } = useAuthenticatedScreen();
  const { colors } = useTheme();

  function renderActiveContent() {
    switch (activeMenu) {
      case 'list':
        return (
          <View style={styles.listSection}>
            <View style={styles.searchRow}>
              <CustomInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setSearchWord}
                onSubmitEditing={handleWordSearch}
                placeholder="Buscar palavra em inglês"
                returnKeyType="search"
                style={styles.searchInput}
                value={searchWord}
              />
              <CustomButton
                disabled={!searchWord.trim()}
                onPress={handleWordSearch}
                title="Buscar"
                variant="text"
              />
            </View>
            <ListView onPress={handleListItemPress} />
          </View>
        );
      case 'history':
        return <HistoryView onWordPress={handleListItemPress} />;
      case 'favorites':
        return <FavoriteView onWordPress={handleListItemPress} />;
      case 'settings':
        return (
          <View style={styles.sectionContent}>
            <Text variant="heading">Ajustes</Text>
            <CustomButton
              disabled={isSigningOut}
              loading={isSigningOut}
              title={isSigningOut ? 'Saindo...' : 'Sair'}
              onPress={handleSignOut}
              style={styles.signOutButton}
            />
          </View>
        );
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View
          style={[
            styles.menu,
            { backgroundColor: colors.border, borderColor: colors.border },
          ]}
        >
          {menus.map(item => (
            <Pressable
              key={item.key}
              onPress={() => setActiveMenu(item.key)}
              style={[
                styles.menuItem,
                {
                  backgroundColor:
                    activeMenu === item.key ? colors.border : colors.card,
                },
              ]}
            >
              <Text variant="label" style={styles.menuLabel}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.activeContent}>{renderActiveContent()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  activeContent: {
    flex: 1,
  },
  listSection: {
    flex: 1,
  },
  searchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    marginTop: 24,
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 16,
  },
  menu: {
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    gap: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    padding: StyleSheet.hairlineWidth,
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 8,
  },
  menuLabel: {
    textAlign: 'center',
  },
  sectionContent: {
    gap: 12,
    marginTop: 32,
  },
  signOutButton: {
    marginTop: 8,
  },
});
