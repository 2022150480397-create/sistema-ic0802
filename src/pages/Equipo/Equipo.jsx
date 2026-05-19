import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import PageContainer from "../../components/common/PageContainer";

const integrantes = [
  {
    nombre: "Juan Pérez García",
    matricula: "220810001",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "l220810001@tesjo.edu.mx",
    rol: "Líder de Proyecto",
    descripcion:
      "Estudiante de ISC apasionado por el desarrollo web. Responsable de la coordinación general del equipo y el diseño de la arquitectura del sistema.",
    color: "#3b82f6",
  },
  {
    nombre: "María López Hernández",
    matricula: "220810002",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "l220810002@tesjo.edu.mx",
    rol: "Frontend Developer",
    descripcion:
      "Especialista en interfaces de usuario con React y Material UI. Encargada del diseño visual y la experiencia de usuario del proyecto.",
    color: "#8b5cf6",
  },
  {
    nombre: "Carlos Ramírez Torres",
    matricula: "220810003",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "l220810003@tesjo.edu.mx",
    rol: "Backend Developer",
    descripcion:
      "Desarrollador enfocado en la lógica del servidor. Responsable de la estructura de datos y el flujo de información del sistema.",
    color: "#10b981",
  },
  {
    nombre: "Ana González Flores",
    matricula: "220810004",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "l220810004@tesjo.edu.mx",
    rol: "QA & Documentación",
    descripcion:
      "Encargada de las pruebas funcionales y la documentación técnica. Garantiza la calidad del software y la correcta entrega del sistema.",
    color: "#f59e0b",
  },
];

function getInitials(nombre) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function IntegranteCard({ integrante }) {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 3,
        transition: "transform 0.25s, box-shadow 0.25s",
        "&:hover": { transform: "translateY(-6px)", boxShadow: "0 12px 30px rgba(0,0,0,0.15)" },
        borderTop: `4px solid ${integrante.color}`,
      }}
    >
      <CardContent>
        <Stack alignItems="center" spacing={1} sx={{ mb: 2, mt: 1 }}>
          <Avatar
            sx={{
              width: 88,
              height: 88,
              fontSize: "1.8rem",
              fontWeight: 700,
              bgcolor: integrante.color,
              boxShadow: `0 4px 16px ${integrante.color}55`,
            }}
          >
            {getInitials(integrante.nombre)}
          </Avatar>
          <Typography variant="h6" fontWeight={700} textAlign="center">
            {integrante.nombre}
          </Typography>
          <Chip
            label={integrante.rol}
            size="small"
            sx={{
              bgcolor: `${integrante.color}18`,
              color: integrante.color,
              fontWeight: 600,
              border: `1px solid ${integrante.color}44`,
            }}
          />
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Stack spacing={1} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BadgeIcon fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">Matrícula:</Typography>
            <Typography variant="body2" fontWeight={600}>{integrante.matricula}</Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <SchoolIcon fontSize="small" sx={{ color: "text.secondary", mt: 0.3 }} />
            <Typography variant="body2" color="text.secondary">{integrante.carrera}</Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <EmailIcon fontSize="small" sx={{ color: "text.secondary", mt: 0.3 }} />
            <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
              {integrante.correo}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {integrante.descripcion}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Equipo() {
  return (
    <PageContainer title="Equipo de Trabajo">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        Conoce a los integrantes del equipo IC-0802 que desarrollaron este proyecto
        para la asignatura de Programación Web — TESJO.
      </Typography>
      <Grid container spacing={3}>
        {integrantes.map((integrante) => (
          <Grid item xs={12} sm={6} lg={3} key={integrante.matricula}>
            <IntegranteCard integrante={integrante} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
