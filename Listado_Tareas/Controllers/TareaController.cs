using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Listado_Tareas.Models;
using System.Linq;

namespace Listado_Tareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly PruebaContext _context;

        public TareaController(PruebaContext context) { 
        
          _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista() {
            List<Tarea> lista = _context.Tareas.OrderByDescending(t => t.IdTarea).ThenBy(t=>t.FechaRegistro).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Tarea request)
        {
            await _context.Tareas.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Cerrar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Tarea tarea = _context.Tareas.Find(id); 
             _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }


    }
}
