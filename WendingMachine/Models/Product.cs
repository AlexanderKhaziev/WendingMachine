namespace WendingMachine.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public int Price { get; set; }
        public string? ImagePath { get; set; }
    }
}
