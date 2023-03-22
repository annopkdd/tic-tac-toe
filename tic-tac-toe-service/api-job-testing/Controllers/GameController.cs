using api_job_testing.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace api_job_testing.Controllers;

[ApiController]
[Route("api/game")]
public class GameController : ControllerBase
{
    private readonly DataContext _context;

    public GameController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetGameLogs")]
    public async Task<ActionResult<IEnumerable<GameDto>>> GetGameLogs()
    {
        var result =  await _context.Games.ToListAsync();
        return Ok(new {
            list = result
        });

    }

    [HttpPost]
    [Route("AddGameLog")]
    public async Task<ActionResult<IEnumerable<GameDto>>> AddGameLog(Game gameItem)
    {
         _context.Games.Add(gameItem);
        await _context.SaveChangesAsync();

        return Ok(new {
            result = true
        });

    }

    [HttpGet]
    [Route("GetStatistics")]
    public async Task<ActionResult<IEnumerable<GameDto>>> GetStatistics()
    {
        var total = _context.Games.Count();
        var drawCount = _context.Games.Where(game => game.game_status == "DRAW").Count();
        var xWinCount = _context.Games.Where(game => game.game_status == "X").Count();
        var oWinCount = _context.Games.Where(game => game.game_status == "O").Count();
        var quitCount = _context.Games.Where(game => game.game_status == "QUIT").Count();

        return Ok(new 
        {
            drawPercent= Math.Round(Convert.ToDouble(drawCount * 100) / total, 2),
            xWinPercent = Math.Round(Convert.ToDouble(xWinCount * 100) / total, 2),
            oWinPercent = Math.Round(Convert.ToDouble(oWinCount * 100) / total, 2),
            quitPercent = Math.Round(Convert.ToDouble(quitCount * 100) / total, 2),
        });

    }
}

