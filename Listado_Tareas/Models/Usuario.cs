using System;
using System.Collections.Generic;

namespace Listado_Tareas.Models;

public partial class Usuario
{
    public int? IdNombre { get; set; }

    public string? Nombre { get; set; }

    public string? Apaterno { get; set; }

    public string? Amaterno { get; set; }

    public int? Edad { get; set; }
}
