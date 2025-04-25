import { IconUser } from '@tabler/icons-react';
import { TagsIcon, RolesIcon, PrioridadIcon, BodegaIcon, ProductosIcon, ClientesIcon } from "../shared/icons"

const icons = {
  IconUser,
  TagsIcon,
  RolesIcon,
  PrioridadIcon,
  BodegaIcon,
  ProductosIcon,
  ClientesIcon
  
};

export const configs = {
  id: 'configs',
  title: 'Configuraciones',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Usuarios',
      type: 'item',
      url: '/home/user',
      icon: icons.IconUser
    }, 
    {
      id: 'roles',
      title: 'Roles',
      type: 'item',
      url: '/home/roles',
      icon: icons.RolesIcon
    }, 
    {
      id: 'tags',
      title: 'Tags',
      type: 'item',
      url: '/home/tags',
      icon: icons.TagsIcon
    },
    {
      id: 'priorities',
      title: 'Prioridad',
      type: 'item',
      url: '/home/priorities',
      icon: icons.PrioridadIcon
    },
    {
      id: 'bodega',
      title: 'Bodega',
      type: 'item',
      url: '/home/bodega',
      icon: icons.BodegaIcon
    },
    {
      id: 'productos',
      title: 'Productos',
      type: 'item',
      url: '/home/productos',
      icon: icons.ProductosIcon
    },
    {
      id: 'clientes',
      title: 'Clientes',
      type: 'item',
      url: '/home/clientes',
      icon: icons.ClientesIcon
    }


  ]
};
