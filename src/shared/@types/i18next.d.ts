// import the original type declarations
// import all namespaces (for the default language, only)
import '@/shared/@types/i18next';
import ns1 from '@/shared/locales/en/en.json';

declare module 'i18next' {
	// Extend CustomTypeOptions
	interface CustomTypeOptions {
		// custom namespace type, if you changed it
		defaultNS: 'ns1';
		// custom resources type
		resources: {
			ns1: typeof ns1;
		};
		// other
	}
}
