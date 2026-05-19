import { useState } from "react";
import {
  Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Grid, IconButton,
  InputAdornment, Paper, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Tooltip, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PageContainer from "../../components/common/PageContainer";

// ── Datos iniciales ───────────────────────────────────────────────────────────
const initialData = [
  { id: 1, nombre: "Juan Pérez",   matricula: "220810001", correo: "juan@tesjo.edu.mx",   telefono: "722-100-0001", estado: "Activo" },
  { id: 2, nombre: "María López",  matricula: "220810002", correo: "maria@tesjo.edu.mx",  telefono: "722-100-0002", estado: "Activo" },
  { id: 3, nombre: "Carlos Ruiz",  matricula: "220810003", correo: "carlos@tesjo.edu.mx", telefono: "722-100-0003", estado: "Inactivo" },
];

const emptyForm = { nombre: "", matricula: "", correo: "", telefono: "", estado: "Activo" };

// ── Validaciones ──────────────────────────────────────────────────────────────
function validate(form) {
  const errors = {};
  if (!form.nombre.trim())        errors.nombre    = "El nombre es requerido";
  if (!form.matricula.trim())     errors.matricula = "La matrícula es requerida";
  if (!form.correo.trim())        errors.correo    = "El correo es requerido";
  else if (!/\S+@\S+\.\S+/.test(form.correo)) errors.correo = "Correo inválido";
  if (!form.telefono.trim())      errors.telefono  = "El teléfono es requerido";
  return errors;
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function Crud() {
  const [registros, setRegistros]   = useState(initialData);
  const [form, setForm]             = useState(emptyForm);
  const [errors, setErrors]         = useState({});
  const [editId, setEditId]         = useState(null);
  const [openForm, setOpenForm]     = useState(false);
  const [deleteId, setDeleteId]     = useState(null);
  const [search, setSearch]         = useState("");

  // ── Filtro de búsqueda ──────────────────────────────────────────────────────
  const filtered = registros.filter((r) =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.matricula.includes(search) ||
    r.correo.toLowerCase().includes(search.toLowerCase())
  );

  // ── Abrir formulario (crear o editar) ───────────────────────────────────────
  const handleOpenCreate = () => {
    setForm(emptyForm);
    setErrors({});
    setEditId(null);
    setOpenForm(true);
  };

  const handleOpenEdit = (registro) => {
    setForm({ ...registro });
    setErrors({});
    setEditId(registro.id);
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);

  // ── Cambio de campo ─────────────────────────────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  // ── Guardar (crear o editar) ────────────────────────────────────────────────
  const handleSave = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (editId) {
      setRegistros(registros.map((r) => (r.id === editId ? { ...form, id: editId } : r)));
    } else {
      const newId = registros.length ? Math.max(...registros.map((r) => r.id)) + 1 : 1;
      setRegistros([...registros, { ...form, id: newId }]);
    }
    setOpenForm(false);
  };

  // ── Eliminar ────────────────────────────────────────────────────────────────
  const handleDeleteConfirm = () => {
    setRegistros(registros.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <PageContainer title="Gestión de Estudiantes">

      {/* Barra de acciones */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Buscar por nombre, matrícula o correo…"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
          sx={{ flex: 1, maxWidth: 420 }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Nuevo Registro
        </Button>
      </Stack>

      {/* Resumen */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total",    value: registros.length,                           color: "#3b82f6" },
          { label: "Activos",  value: registros.filter((r) => r.estado === "Activo").length,   color: "#10b981" },
          { label: "Inactivos",value: registros.filter((r) => r.estado !== "Activo").length,   color: "#f59e0b" },
        ].map((stat) => (
          <Grid item xs={12} sm={4} key={stat.label}>
            <Card sx={{ borderLeft: `4px solid ${stat.color}`, borderRadius: 2 }}>
              <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography variant="h4" fontWeight={700} sx={{ color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabla */}
      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "rgba(25,118,210,0.08)" }}>
            <TableRow>
              {["#", "Nombre", "Matrícula", "Correo", "Teléfono", "Estado", "Acciones"].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6, color: "text.secondary" }}>
                  No se encontraron registros.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((r, i) => (
              <TableRow key={r.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell fontWeight={600}>{r.nombre}</TableCell>
                <TableCell>{r.matricula}</TableCell>
                <TableCell>{r.correo}</TableCell>
                <TableCell>{r.telefono}</TableCell>
                <TableCell>
                  <Chip
                    label={r.estado}
                    size="small"
                    color={r.estado === "Activo" ? "success" : "warning"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton size="small" color="primary" onClick={() => handleOpenEdit(r)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton size="small" color="error" onClick={() => setDeleteId(r.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Dialog: Crear / Editar ── */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editId ? "Editar Registro" : "Nuevo Registro"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                fullWidth
                error={!!errors.nombre}
                helperText={errors.nombre}
                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Matrícula"
                name="matricula"
                value={form.matricula}
                onChange={handleChange}
                fullWidth
                error={!!errors.matricula}
                helperText={errors.matricula}
                InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                fullWidth
                error={!!errors.telefono}
                helperText={errors.telefono}
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                fullWidth
                error={!!errors.correo}
                helperText={errors.correo}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Estado"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                fullWidth
                SelectProps={{ native: true }}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseForm} color="inherit">Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>
            {editId ? "Guardar Cambios" : "Crear Registro"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Dialog: Confirmar eliminación ── */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>¿Eliminar registro?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="inherit">Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

    </PageContainer>
  );
}
