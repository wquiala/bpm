import { selectTheme, getTheme, setTheme, themes, Themes } from '@/stores/themeSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getCompanyList } from '@/stores/settingsSlice';

function Main() {
   const dispatch = useAppDispatch();
   const theme = useAppSelector(selectTheme);
   const Component = getTheme(theme).component;

   const { search } = useLocation();
   const queryParams = new URLSearchParams(search);

   const switchTheme = (theme: Themes['name']) => {
      dispatch(setTheme(theme));
   };

   useEffect(() => {
      if (queryParams.get('theme')) {
         const selectedTheme = themes.find((theme) => theme.name === queryParams.get('theme'));

         if (selectedTheme) {
            switchTheme(selectedTheme.name);
         }
      }

      dispatch(getCompanyList());
   }, []);

   return (
      <div>
         {/*                   <ThemeSwitcher />
          */}{' '}
         <Component />
      </div>
   );
}

export default Main;
