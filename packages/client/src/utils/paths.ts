export const getBreadCumbList = (pathName : string) => { 
    
    const navItems = pathName.split('/').filter(item => {
        if (item !== "") return item;
    });
    const formattedNavItems = navItems.map(navItem => {
        return {
            name: navItem,
            link: '/' + navItem
        }
    });
    
    return formattedNavItems;
}