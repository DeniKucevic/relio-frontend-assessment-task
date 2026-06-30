import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2f3e63',
      light: '#5a6789',
      dark: '#1e2845',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c63ff',
    },
    error: {
      main: '#e05555',
    },
    warning: {
      main: '#f0a83a',
    },
    info: {
      main: '#3b8fd9',
    },
    success: {
      main: '#3fa66e',
    },
    background: {
      default: '#f4f5f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1b1f2a',
      secondary: '#5f6573',
    },
    divider: '#e2e4e9',
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: ['Inter', '-apple-system', 'sans-serif'].join(','),
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&.Mui-selected': {
            backgroundColor: 'rgba(47, 62, 99, 0.08)',
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
  },
})
