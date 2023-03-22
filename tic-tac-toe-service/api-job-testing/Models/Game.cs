using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_job_testing.Models
{
    [Table("game_log")]
    public class Game
    {
        [Column("id")]
        public int id { get; set; }

        [Column(name: "game_date")]
        [Required]
        public string game_date { get; set; }

        [Column(name: "game_status")]
        [Required]
        public string game_status { get; set; }

        [Column(name: "game_duration")]
        [Required]
        public int game_duration { get; set; }
    }
}
